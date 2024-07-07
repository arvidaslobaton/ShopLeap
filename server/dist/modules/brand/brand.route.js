"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brand_controller_1 = __importDefault(require("./brand.controller"));
const validateDto_1 = require("../../middleware/validateDto");
const brand_dto_1 = require("../../dto/brand.dto");
const brand = (0, express_1.Router)();
const controller = new brand_controller_1.default();
brand.route("/").post((0, validateDto_1.validateDto)(brand_dto_1.CreateBrandDto), controller.createBrand);
brand.route("/all").get(controller.getAllBrands);
brand.route("/:slug").get(controller.getBrandBySlug);
brand.route("/:id").put((0, validateDto_1.validateDto)(brand_dto_1.UpdateBrandDto), controller.updateBrand);
brand.route("/:id").delete(controller.deleteBrand);
exports.default = brand;
