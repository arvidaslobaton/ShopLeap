"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subCategory_controller_1 = __importDefault(require("./subCategory.controller"));
const validateDto_1 = require("../../middleware/validateDto");
const subCategory_dto_1 = require("../../dto/subCategory.dto");
const subCategory = (0, express_1.Router)();
const controller = new subCategory_controller_1.default();
subCategory
    .route("/")
    .post((0, validateDto_1.validateDto)(subCategory_dto_1.CreateSubCategoryDto), controller.createSubCategory);
subCategory.route("/all").get(controller.getAllSubCategories);
subCategory.route("/:slug").get(controller.getSubCategoryBySlug);
subCategory
    .route("/:id")
    .put((0, validateDto_1.validateDto)(subCategory_dto_1.UpdateSubCategoryDto), controller.updateSubCategory);
subCategory.route("/:id").delete(controller.deleteSubCategory);
exports.default = subCategory;
