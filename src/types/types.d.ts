export type TRest = {
  id: string;
  name: string;
};

export type TRestArr = TRest[];

export interface GoogleReviewsResponse {
  reviews: Review[];
  averageRating: number;
  totalReviewCount: number;
  nextPageToken?: string;
}

export interface Review {
  reviewId: string;
  reviewer: Reviewer;
  starRating: StarRating;
  comment?: string;
  createTime: string;
  updateTime: string;
  reviewReply?: ReviewReply;
  name: string;
}

export interface Reviewer {
  profilePhotoUrl: string;
  displayName: string;
}

export interface ReviewReply {
  comment: string;
  updateTime: string;
}

export type StarRating = "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
