"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("./users.controller"));
const users = (0, express_1.Router)();
const controller = new users_controller_1.default();
users.route("/register").post(controller.registerUser);
users.route("/login").post(controller.loginUser);
exports.default = users;
