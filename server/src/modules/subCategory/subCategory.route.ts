import { Router } from "express";
import Controller from "./subCategory.controller";
import { authorize, protect } from "../../middleware/authMiddleware";
import { validateDto } from "../../middleware/validateDto";
import {
  CreateSubCategoryDto,
  UpdateSubCategoryDto,
} from "../../dto/subCategory.dto";

const subCategory: Router = Router();
const controller = new Controller();

subCategory
  .route("/")
  .post(validateDto(CreateSubCategoryDto), controller.createSubCategory);
subCategory.route("/all").get(controller.getAllSubCategories);
subCategory.route("/:slug").get(controller.getSubCategoryBySlug);
subCategory
  .route("/:id")
  .put(validateDto(UpdateSubCategoryDto), controller.updateSubCategory);
subCategory.route("/:id").delete(controller.deleteSubCategory);

export default subCategory;
