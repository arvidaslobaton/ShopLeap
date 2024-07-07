import { Router } from "express";
import Controller from "./users.controller";
import { authorize, protect } from "../../middleware/authMiddleware";
import { validateDto } from "../../middleware/validateDto";
import { RegisterUserDto, UpdateProfileDto } from "../../dto/user.dto";

const users: Router = Router();
const controller = new Controller();

users
  .route("/register")
  .post(validateDto(RegisterUserDto), controller.registerUser);
users.route("/login").post(controller.loginUser);
users.route("/profile").get(protect, controller.userProfile);
users
  .route("/profile")
  .put(validateDto(UpdateProfileDto), protect, controller.updateProfile);
users.route("/profiles").get(controller.getAllProfiles);
users.route("/profile/:id").delete(protect, controller.deleteProfile);

export default users;
