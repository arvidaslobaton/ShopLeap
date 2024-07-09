import { Router } from "express";
import Controller from "./review.controller";
import { authorize, protect } from "../../middleware/authMiddleware";
import { validateDto } from "../../middleware/validateDto";
import { CreateReviewDto, UpdateReviewDto } from "../../dto/review.dto";

const review: Router = Router();
const controller = new Controller();

review.route("/").post(validateDto(CreateReviewDto), controller.createReview);
review.route("/all").get(controller.getAllReviews);
review.route("/:id").get(controller.getReviewById);
review.route("/:id").put(validateDto(UpdateReviewDto), controller.updateReview);
review.route("/approve-request/:id").put(controller.approveAReview);
review.route("/:id").delete(controller.deleteReview);

export default review;
