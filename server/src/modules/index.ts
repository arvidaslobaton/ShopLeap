import { Router } from "express";
import users from "./users/users.route";
import vendor from "./vendor/vendor.route";
import product from "./product/product.route";
import brand from "./brand/brand.route";
import category from "./category/category.route";
import subCategory from "./subCategory/subCategory.route";
import wishlist from "./wishlist/wishlist.route";
import review from "./review/review.route";
import uploadRouter from "./upload/upload.route";

const router: Router = Router();

router.use("/users", users);
router.use("/vendor", vendor);
router.use("/product", product);
router.use("/brand", brand);
router.use("/category", category);
router.use("/subCategory", subCategory);
router.use("/wishlist", wishlist);
router.use("/review", review);
router.use("/upload", uploadRouter);

export default router;
