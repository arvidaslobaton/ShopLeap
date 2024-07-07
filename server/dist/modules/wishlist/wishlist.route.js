"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wishlist_controller_1 = __importDefault(require("./wishlist.controller"));
const validateDto_1 = require("../../middleware/validateDto");
const wishlist_dto_1 = require("../../dto/wishlist.dto");
const wishlist = (0, express_1.Router)();
const controller = new wishlist_controller_1.default();
wishlist
    .route("/")
    .post((0, validateDto_1.validateDto)(wishlist_dto_1.CreateWishlistDto), controller.createWishlist);
wishlist.route("/all").get(controller.getAllWishlist);
wishlist.route("/:id").get(controller.getWishlistById);
wishlist
    .route("/:id")
    .put((0, validateDto_1.validateDto)(wishlist_dto_1.UpdateWishlistDto), controller.updateWishlist);
wishlist.route("/:id").delete(controller.deleteWishlist);
exports.default = wishlist;
