"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../lib/errors");
const wishlistModel_1 = require("../../models/wishlistModel");
class WishlistService {
    async createWishlist(createWishlistData) {
        try {
            const newWishlist = await wishlistModel_1.Wishlist.create(createWishlistData);
            if (!newWishlist) {
                console.log("Failed to create new wishlist");
                return {
                    error: new errors_1.HttpBadRequestError("Invalid wishlist data", []),
                };
            }
            return { data: newWishlist };
        }
        catch (error) {
            console.log("Error creating wishlist:", error);
            return {
                error: new errors_1.HttpBadRequestError("An error occurred during wishlist creation", []),
            };
        }
    }
    async getAllWishlist() {
        try {
            const wishlist = await wishlistModel_1.Wishlist.find();
            return { data: wishlist };
        }
        catch (error) {
            console.log(error);
        }
    }
    async getWishlistById(id) {
        try {
            const wishlist = await wishlistModel_1.Wishlist.findById(id);
            if (!wishlist) {
                return { error: new errors_1.HttpNotFoundError("wishlist not found", []) };
            }
            return { data: wishlist };
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateWishlist(id, updateWishlistData) {
        try {
            const updatedWishlist = await wishlistModel_1.Wishlist.findByIdAndUpdate(id, updateWishlistData, {
                new: true,
            });
            if (!updatedWishlist) {
                return { error: new errors_1.HttpNotFoundError("Wishlist not found", []) };
            }
            return { data: updatedWishlist };
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteWishlist(id) {
        try {
            const deletedWishlist = await wishlistModel_1.Wishlist.findByIdAndDelete(id);
            if (!deletedWishlist) {
                return { error: new errors_1.HttpNotFoundError("Wishlist not found", []) };
            }
            return { data: deletedWishlist };
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = WishlistService;
