import { CreateWishlistDto, UpdateWishlistDto } from "../../dto/wishlist.dto";
import { HttpBadRequestError, HttpNotFoundError } from "../../lib/errors";
import { Wishlist } from "../../models/wishlistModel";

export default class WishlistService {
  public async createWishlist(createWishlistData: CreateWishlistDto) {
    try {
      const newWishlist = await Wishlist.create(createWishlistData);

      if (!newWishlist) {
        console.log("Failed to create new wishlist");
        return {
          error: new HttpBadRequestError("Invalid wishlist data", []),
        };
      }

      return { data: newWishlist };
    } catch (error) {
      console.log("Error creating wishlist:", error);
      return {
        error: new HttpBadRequestError(
          "An error occurred during wishlist creation",
          []
        ),
      };
    }
  }

  public async getAllWishlist() {
    try {
      const wishlist = await Wishlist.find();

      return { data: wishlist };
    } catch (error) {
      console.log(error);
    }
  }

  public async getWishlistById(id: string) {
    try {
      const wishlist = await Wishlist.findById(id);

      if (!wishlist) {
        return { error: new HttpNotFoundError("wishlist not found", []) };
      }

      return { data: wishlist };
    } catch (error) {
      console.log(error);
    }
  }

  public async updateWishlist(
    id: string,
    updateWishlistData: UpdateWishlistDto
  ) {
    try {
      const updatedWishlist = await Wishlist.findByIdAndUpdate(
        id,
        updateWishlistData,
        {
          new: true,
        }
      );

      if (!updatedWishlist) {
        return { error: new HttpNotFoundError("Wishlist not found", []) };
      }

      return { data: updatedWishlist };
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteWishlist(id: string) {
    try {
      const deletedWishlist = await Wishlist.findByIdAndDelete(id);

      if (!deletedWishlist) {
        return { error: new HttpNotFoundError("Wishlist not found", []) };
      }

      return { data: deletedWishlist };
    } catch (error) {
      console.log(error);
    }
  }
}
