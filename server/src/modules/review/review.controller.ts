import { Request, Response, NextFunction } from "express";
import ReviewService from "./review.service";

export default class ReviewController {
  private readonly reviewService = new ReviewService();

  // @desc Create a new review
  // @router /api/review/
  // @access Private
  public createReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const newReview = await this.reviewService.createReview(req.body);

      if (newReview?.error) {
        res.status(400).json({ status: false, error: newReview.error });
      }
      res.status(201).json({ status: true, data: newReview });
    } catch (error) {
      console.log(error);
    }
  };

  // @desc Get all reviews
  // @router /api/review/all
  // @access Public
  public getAllReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const allReviews = await this.reviewService.getAllReviews();

      res.status(201).json({ status: true, data: allReviews });
    } catch (error) {
      console.log(error);
    }
  };

  // @desc get review
  // @router /api/review/:id
  // @access Public
  public getReviewById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const review = await this.reviewService.getReviewById(req.params.id);

      if (!review) {
        res.status(400).json({ status: false, error: "review not found" });
      }

      if (review?.error) {
        res.status(400).json({ status: false, error: review.error });
      }

      res.status(201).json({ status: true, data: review });
    } catch (error) {
      console.log(error);
    }
  };

  // @desc Update a review
  // @router /api/review/:id
  // @access Public
  public updateReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const updatedReview = await this.reviewService.updateReview(
        req.params.id,
        req.body
      );

      if (!updatedReview) {
        res.status(400).json({ status: false, error: "review not found" });
      }

      if (updatedReview?.error) {
        res.status(400).json({ status: false, error: updatedReview.error });
      }
      res.status(201).json({ status: true, data: updatedReview });
    } catch (error) {
      console.log(error);
    }
  };

  // @desc Delete a review
  // @router /api/review/:id
  // @access Public
  public deleteReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const deletedReview = await this.reviewService.deleteReview(
        req.params.id
      );
      if (deletedReview?.error) {
        return res
          .status(400)
          .json({ status: false, error: deletedReview.error });
      }

      res
        .status(201)
        .json({ status: true, message: "review deleted successfully" });
    } catch (error) {
      console.log(error);
    }
  };

  // @desc Update Is Approved
  // @router /api/review/approve-request
  // access private
  public approveAReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const review = await this.reviewService.approveAReview(
        req.params.id,
        req.body.isApproved
      );
      console.log("is approved:", req.body.isApproved);

      return res.status(201).json({ status: true, data: review });
    } catch (error) {
      console.log(error);
    }
  };
}
