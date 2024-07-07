"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wishlist_service_1 = __importDefault(require("./wishlist.service"));
class WishlistController {
    wishlistService = new wishlist_service_1.default();
    // @desc Create a new wishlist
    // @router /api/wishlist/
    // @access Private
    createWishlist = async (req, res, next) => {
        try {
            const newWishlist = await this.wishlistService.createWishlist(req.body);
            if (newWishlist?.error) {
                res.status(400).json({ status: false, error: newWishlist.error });
            }
            res.status(201).json({ status: true, data: newWishlist });
        }
        catch (error) {
            console.log(error);
        }
    };
    // @desc Get all wishlist
    // @router /api/wishlist/all
    // @access Public
    getAllWishlist = async (req, res, next) => {
        try {
            const allWishlist = await this.wishlistService.getAllWishlist();
            res.status(201).json({ status: true, data: allWishlist });
        }
        catch (error) {
            console.log(error);
        }
    };
    // @desc get wishlist
    // @router /api/wishlist/:slug
    // @access Public
    getWishlistById = async (req, res, next) => {
        try {
            const wishlist = await this.wishlistService.getWishlistById(req.params.id);
            if (!wishlist) {
                res.status(400).json({ status: false, error: "wishlist not found" });
            }
            if (wishlist?.error) {
                res.status(400).json({ status: false, error: wishlist.error });
            }
            res.status(201).json({ status: true, data: wishlist });
        }
        catch (error) {
            console.log(error);
        }
    };
    // @desc Update a wishlist
    // @router /api/wishlist/:id
    // @access Public
    updateWishlist = async (req, res, next) => {
        try {
            const updatedWishlist = await this.wishlistService.updateWishlist(req.params.id, req.body);
            if (!updatedWishlist) {
                res.status(400).json({ status: false, error: "wishlist not found" });
            }
            if (updatedWishlist?.error) {
                res.status(400).json({ status: false, error: updatedWishlist.error });
            }
            res.status(201).json({ status: true, data: updatedWishlist });
        }
        catch (error) {
            console.log(error);
        }
    };
    // @desc Update a wishlist
    // @router /api/wishlist/:id
    // @access Public
    deleteWishlist = async (req, res, next) => {
        try {
            const deletedWishlist = await this.wishlistService.deleteWishlist(req.params.id);
            if (deletedWishlist?.error) {
                return res
                    .status(400)
                    .json({ status: false, error: deletedWishlist.error });
            }
            res
                .status(201)
                .json({ status: true, message: "wishlist deleted successfully" });
        }
        catch (error) {
            console.log(error);
        }
    };
}
exports.default = WishlistController;
