import { Router } from "express";
import Controller from "./category.controller";
import { authorize, protect } from "../../middleware/authMiddleware";
import { validateDto } from "../../middleware/validateDto";
import { CreateCategoryDto, UpdateCategoryDto } from "../../dto/category.dto";

const category: Router = Router();
const controller = new Controller();

category
  .route("/")
  .post(validateDto(CreateCategoryDto), controller.createCategory);
category.route("/all").get(controller.getAllCategories);
category.route("/:slug").get(controller.getCategoryBySlug);
category
  .route("/:id")
  .put(validateDto(UpdateCategoryDto), controller.updateCategory);
category.route("/:id").delete(controller.deleteCategory);

export default category;
