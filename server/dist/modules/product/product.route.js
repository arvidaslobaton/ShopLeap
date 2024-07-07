"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("./product.controller"));
const validateDto_1 = require("../../middleware/validateDto");
const product_dto_1 = require("../../dto/product.dto");
const product = (0, express_1.Router)();
const controller = new product_controller_1.default();
product
    .route("/")
    .post((0, validateDto_1.validateDto)(product_dto_1.CreateProductDto), controller.createProduct);
product.route("/all").get(controller.getAllProducts);
product.route("/:slug").get(controller.getProductBySlug);
product
    .route("/:id")
    .put((0, validateDto_1.validateDto)(product_dto_1.UpdateProductDto), controller.updateProduct);
product.route("/:id").delete(controller.deleteProduct);
exports.default = product;
