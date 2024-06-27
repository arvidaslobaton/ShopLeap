import { Router } from "express";
import Controller from "./product.controller";
import { authorize, protect } from "../../middleware/authMiddleware";

const product: Router = Router();
const controller = new Controller();

product.route("/").post(controller.createProduct);
product.route("/all").get(controller.getAllProducts);
product.route("/:slug").get(controller.getProductBySlug);
product.route("/:id").put(controller.updateProduct);
product.route("/:id").delete(controller.deleteProduct);

export default product;
