import { Router } from "express";
import users from "./users/users.route";
import vendor from "./vendor/vendor.route";

const router: Router = Router();

router.use("/users", users);
router.use("/vendor", vendor);

export default router;
