import mongoose, { Schema, Document, Model } from "mongoose";

// Wishlist Interface
export interface IWishlist extends Document {
  user: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Wishlist Schema
const wishlistSchema = new Schema<IWishlist>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Wishlist Model
export const Wishlist: Model<IWishlist> = mongoose.model<IWishlist>(
  "Wishlist",
  wishlistSchema
);
