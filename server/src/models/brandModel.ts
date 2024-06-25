import mongoose, { Document, Model } from "mongoose";

export interface IBrand extends Document {
  name: string;
  description?: string;
  logo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const brandSchema = new mongoose.Schema<IBrand>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    logo: String,
  },
  { timestamps: true }
);

export const Brand: Model<IBrand> = mongoose.model<IBrand>(
  "Brand",
  brandSchema
);
