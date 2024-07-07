"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = __importDefault(require("./category.controller"));
const validateDto_1 = require("../../middleware/validateDto");
const category_dto_1 = require("../../dto/category.dto");
const category = (0, express_1.Router)();
const controller = new category_controller_1.default();
category
    .route("/")
    .post((0, validateDto_1.validateDto)(category_dto_1.CreateCategoryDto), controller.createCategory);
category.route("/all").get(controller.getAllCategories);
category.route("/:slug").get(controller.getCategoryBySlug);
category
    .route("/:id")
    .put((0, validateDto_1.validateDto)(category_dto_1.UpdateCategoryDto), controller.updateCategory);
category.route("/:id").delete(controller.deleteCategory);
exports.default = category;
