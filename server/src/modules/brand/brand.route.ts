import { Router } from "express";
import Controller from "./brand.controller";
import { authorize, protect } from "../../middleware/authMiddleware";
import { validateDto } from "../../middleware/validateDto";
import { CreateBrandDto, UpdateBrandDto } from "../../dto/brand.dto";

const brand: Router = Router();
const controller = new Controller();

brand.route("/").post(validateDto(CreateBrandDto), controller.createBrand);
brand.route("/all").get(controller.getAllBrands);
brand.route("/:slug").get(controller.getBrandBySlug);
brand.route("/:id").put(validateDto(UpdateBrandDto), controller.updateBrand);
brand.route("/:id").delete(controller.deleteBrand);

export default brand;
