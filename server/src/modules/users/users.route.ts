import { Router } from "express";
import Controller from "./users.controller";
import { authorize, protect } from "../../middleware/authMiddleware";

const users: Router = Router();
const controller = new Controller();

users.route("/register").post(controller.registerUser);
users.route("/login").post(controller.loginUser);
users.route("/profile").get(protect, controller.userProfile);
users.route("/profile").put(protect, controller.updateProfile);
users
  .route("/profiles")
  .get(protect, authorize("admin"), controller.getAllProfiles);
users.route("/profile/:id").delete(protect, controller.deleteProfile);

export default users;
