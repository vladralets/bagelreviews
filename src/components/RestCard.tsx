import { useState } from "react";
import { GoogleReviewsResponse, TRest } from "../types/types";
import Button from "./Button";

interface IRestCardProps {
  rest: TRest;
}

// Конфигурация OAuth
const CLIENT_ID = "520751353666-t4ub1cgobqh6g70dd6mn6fhagkl88o16.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REFRESH_TOKEN = "1//042WCEyufCjb2CgYIARAAGAQSNwF-L9IrQ7ixUPOy0Iakr5w7zLa3ykXjYNglzKYWRhrtlven5hsT2XJGeHjhmLpLDAPB4waWK2c";

const RestCard = ({ rest }: IRestCardProps) => {
  const [wasUpdated, setWasUpdated] = useState(false);
  const [reviewsData, setReviewsData] = useState<GoogleReviewsResponse>();
  const [updatedDate, setUpdatedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  // Функция для получения нового access token
  const getAccessToken = async (): Promise<string> => {
    try {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          refresh_token: REFRESH_TOKEN,
          grant_type: "refresh_token",
        }).toString(),
      });

      if (!response.ok) {
        throw new Error(`Failed to get access token: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("New Access Token:", data.access_token);
      return data.access_token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      throw error;
    }
  };

  // Функция для получения отзывов
  const getReviewsHandler = async () => {
    console.log("Getting reviews...", rest.id, rest.name);
    setLoading(true);
    try {
      const token = await getAccessToken();

      const response = await fetch(
        `https://mybusiness.googleapis.com/v4/accounts/116525259507018230746/locations/${rest.id}/reviews`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: GoogleReviewsResponse = await response.json();
      setReviewsData(data);
      setWasUpdated(true);
      setUpdatedDate(new Date());
      console.log("Reviews Data:", data);
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
        {wasUpdated ? (
          <>
            <div className="flex gap-4 items-center mb-4">
              <div className="flex gap-2 items-center">
                <p>Count:</p>
                <span>{reviewsData?.totalReviewCount}</span>
              </div>
              <div className="flex gap-2 items-center">
                <p>Rating:</p>
                <span className="bg-green-500 py-1 px-2 rounded-md">
                  {reviewsData &&
                    Math.trunc(reviewsData.averageRating * 1000) / 1000}
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
