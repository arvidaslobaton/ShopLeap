import { Router } from "express";
import Controller from "./product.controller";
import { authorize, protect } from "../../middleware/authMiddleware";
import { validateDto } from "../../middleware/validateDto";
import { CreateProductDto, UpdateProductDto } from "../../dto/product.dto";

const product: Router = Router();
const controller = new Controller();

product
  .route("/")
  .post(validateDto(CreateProductDto), controller.createProduct);
product.route("/all").get(controller.getAllProducts);
product.route("/:slug").get(controller.getProductBySlug);
product
  .route("/:id")
  .put(validateDto(UpdateProductDto), controller.updateProduct);
product.route("/:id").delete(controller.deleteProduct);

export default product;
