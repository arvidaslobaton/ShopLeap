import mongoose, { Document, Model } from "mongoose";
import slugify from "slugify";

export interface IBrand extends Document {
  name: string;
  slug: string;
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
    slug: {
      type: String,
      unique: true,
    },
    description: String,
    logo: String,
  },
  { timestamps: true }
);

brandSchema.pre("save", async function (next) {
  this.slug = slugify(this.name.toLowerCase());
  next();
});

export const Brand: Model<IBrand> = mongoose.model<IBrand>(
  "Brand",
  brandSchema
);
