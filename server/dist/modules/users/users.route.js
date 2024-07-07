"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("./users.controller"));
const authMiddleware_1 = require("../../middleware/authMiddleware");
const validateDto_1 = require("../../middleware/validateDto");
const user_dto_1 = require("../../dto/user.dto");
const users = (0, express_1.Router)();
const controller = new users_controller_1.default();
users
    .route("/register")
    .post((0, validateDto_1.validateDto)(user_dto_1.RegisterUserDto), controller.registerUser);
users.route("/login").post(controller.loginUser);
users.route("/profile").get(authMiddleware_1.protect, controller.userProfile);
users
    .route("/profile")
    .put((0, validateDto_1.validateDto)(user_dto_1.UpdateProfileDto), authMiddleware_1.protect, controller.updateProfile);
users.route("/profiles").get(controller.getAllProfiles);
users.route("/profile/:id").delete(authMiddleware_1.protect, controller.deleteProfile);
exports.default = users;
