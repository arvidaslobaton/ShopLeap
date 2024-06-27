import { Router } from "express";
import users from "./users/users.route";
import vendor from "./vendor/vendor.route";
import product from "./product/product.route";

const router: Router = Router();

router.use("/users", users);
router.use("/vendor", vendor);
router.use("/product", product);

export default router;
