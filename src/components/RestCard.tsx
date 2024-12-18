import { useState } from "react";
import { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } from "../constants/credentials";
import { truncateDecimals } from "../hooks/truncateDecimals";
import { GoogleReviewsResponse, Review, TRest, TReviewDataObj } from "../types/types";
import Button from "./Button";

interface IRestCardProps {
  rest: TRest;
}

const starRatingMap: { [key: string]: number } = {
  STAR_RATING_UNSPECIFIED: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

const RestCard = ({ rest }: IRestCardProps) => {
  const [wasUpdated, setWasUpdated] = useState(false);
  const [reviewsData, setReviewsData] = useState<GoogleReviewsResponse | null>(null);
  const [updatedDate, setUpdatedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);  

  const getAccessToken = async (): Promise<string> => {
    if (accessToken) return accessToken;

    try {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          refresh_token: REFRESH_TOKEN,
          grant_type: "refresh_token",
        }).toString(),
      });

      if (!response.ok) throw new Error("Failed to get access token");

      const data = await response.json();
      setAccessToken(data.access_token);
      return data.access_token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      throw error;
    }
  };

  
  const fetchAllReviews = async (token: string): Promise<TReviewDataObj> => {
    const reviewsData = {
      reviews: [] as Review[],
      averageRating: 0,
      totalReviewCount: 0,
    };
    let nextPageToken: string | undefined;

    do {
      const url = `https://mybusiness.googleapis.com/v4/accounts/116525259507018230746/locations/${rest.id}/reviews${
        nextPageToken ? `?pageToken=${nextPageToken}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

      const data: GoogleReviewsResponse = await response.json();

      reviewsData.reviews.push(...data.reviews);
      reviewsData.totalReviewCount = data.totalReviewCount;
      reviewsData.averageRating = data.averageRating;
      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    return reviewsData;
  };

  const calculateAverageRating = (reviews: Review[]): number => {
    const validRatings = reviews
      .map((review) => starRatingMap[review.starRating] || 0)
      .filter((rating) => rating > 0);

    const totalStars = validRatings.reduce((sum, rating) => sum + rating, 0);
    const average = validRatings.length > 0 ? totalStars / validRatings.length : 0;

    return truncateDecimals(average);
  };

  const getReviewsHandler = async () => {
    setLoading(true);
    try {
      const token = await getAccessToken();
      const reviews = await fetchAllReviews(token);

      const averageRating = calculateAverageRating(reviews.reviews);

      setReviewsData({
        totalReviewCount: reviews.totalReviewCount,
        averageRating,
        reviews: reviews.reviews,
      });

      setWasUpdated(true);
      setUpdatedDate(new Date());
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setWasUpdated(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-md p-6 dark:bg-transparent border-bagel border-[0.5px] shadow-sm shadow-bagel flex flex-col justify-between">
      <div className="flex justify-between mb-12">
        <h2 className="text-2xl font-semibold">{rest.name}</h2>
        <Button
          text={loading ? "Loading..." : "Pull reviews"}
          onClick={getReviewsHandler}
          disabled={loading}
        />
      </div>
      <div>
        {wasUpdated && reviewsData ? (
          <>
            <div className="flex gap-4 items-center mb-4">
              <div className="flex gap-2 items-center">
                <p>Count:</p>
                <span>{reviewsData.totalReviewCount}</span>
              </div>
              <div className="flex gap-2 items-center">
                <p>Rating:</p>
                <span className="bg-green-500 py-1 px-2 rounded-md">
                  {reviewsData.averageRating}
                </span>
              </div>
            </div>
            <p>
              Last updated at:{" "}
              <span>{updatedDate && updatedDate.toLocaleTimeString()}</span>
            </p>
          </>
        ) : (
          <p className="text-center text-red-500">
            Pull reviews to see the latest data
          </p>
        )}
      </div>
    </div>
  );
};

export default RestCard;
