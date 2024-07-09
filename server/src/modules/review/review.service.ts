import { CreateReviewDto, UpdateReviewDto } from "../../dto/review.dto";
import { HttpBadRequestError, HttpNotFoundError } from "../../lib/errors";
import { Review } from "../../models/reviewModel";

export default class ReviewService {
  public async createReview(createReviewData: CreateReviewDto) {
    try {
      const newReview = await Review.create(createReviewData);

      if (!newReview) {
        console.log("Failed to create new review");
        return { error: new HttpBadRequestError("Invalid review data", []) };
      }

      return { data: newReview };
    } catch (error) {
      console.log("Error creating review:", error);
      return {
        error: new HttpBadRequestError(
          "An error occurred during review creation",
          []
        ),
      };
    }
  }

  public async getAllReviews() {
    try {
      const reviews = await Review.find();

      return { reviews: reviews };
    } catch (error) {
      console.log(error);
    }
  }

  public async getReviewById(id: string) {
    try {
      const review = await Review.findById(id);

      if (!review) {
        return { error: new HttpNotFoundError("Review not found", []) };
      }

      return { data: review };
    } catch (error) {
      console.log(error);
    }
  }

  public async updateReview(id: string, updateReviewData: UpdateReviewDto) {
    try {
      const updatedReview = await Review.findByIdAndUpdate(
        id,
        updateReviewData,
        {
          new: true,
        }
      );

      if (!updatedReview) {
        return { error: new HttpNotFoundError("Review not found", []) };
      }

      return { data: updatedReview };
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteReview(id: string) {
    try {
      const deletedReview = await Review.findByIdAndDelete(id);

      if (!deletedReview) {
        return { error: new HttpNotFoundError("Review not found", []) };
      }

      return { data: deletedReview };
    } catch (error) {
      console.log(error);
    }
  }

  public async approveAReview(id: string, approved: boolean) {
    try {
      const review = await Review.findByIdAndUpdate(
        id,
        { isApproved: approved },
        { new: true }
      );

      if (!review) {
        return { error: new HttpNotFoundError("Review not found", []) };
      }

      return { data: review };
    } catch (error) {
      console.log(error);
    }
  }
}
