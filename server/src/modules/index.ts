import { Router } from "express";
import users from "./users/users.route";
import vendor from "./vendor/vendor.route";
import product from "./product/product.route";
import brand from "./brand/brand.route";
import category from "./category/category.route";
import subCategory from "./subCategory/subCategory.route";
import wishlist from "./wishlist/wishlist.route";

const router: Router = Router();

router.use("/users", users);
router.use("/vendor", vendor);
router.use("/product", product);
router.use("/brand", brand);
router.use("/category", category);
router.use("/subCategory", subCategory);
router.use("/wishlist", wishlist);

export default router;
