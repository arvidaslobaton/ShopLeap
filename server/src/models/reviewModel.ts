import mongoose, { Schema, Document, Model } from "mongoose";

// Vendor Reply Interface
interface IVendorReply {
  comment: string;
  createdAt: Date;
}

// Review Interface
export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
  vendorReply?: IVendorReply;
  createdAt?: Date;
  updatedAt?: Date;
}

// Review Schema
const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
    vendorReply: {
      comment: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  },
  { timestamps: true }
);

reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Review Model
export const Review: Model<IReview> = mongoose.model<IReview>(
  "Review",
  reviewSchema
);
