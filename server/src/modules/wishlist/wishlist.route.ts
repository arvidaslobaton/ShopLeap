import { Router } from "express";
import Controller from "./wishlist.controller";
import { authorize, protect } from "../../middleware/authMiddleware";
import { validateDto } from "../../middleware/validateDto";
import { CreateWishlistDto, UpdateWishlistDto } from "../../dto/wishlist.dto";

const wishlist: Router = Router();
const controller = new Controller();

wishlist
  .route("/")
  .post(validateDto(CreateWishlistDto), controller.createWishlist);
wishlist.route("/all").get(controller.getAllWishlist);
wishlist.route("/:id").get(controller.getWishlistById);
wishlist
  .route("/:id")
  .put(validateDto(UpdateWishlistDto), controller.updateWishlist);
wishlist.route("/:id").delete(controller.deleteWishlist);

export default wishlist;
