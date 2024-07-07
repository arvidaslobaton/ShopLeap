import mongoose, { Schema, Document, Model } from "mongoose";
import slugify from "slugify";

export interface ISubCategory extends Document {
  name: string;
  description?: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const subCategorySchema = new Schema<ISubCategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

subCategorySchema.pre("save", async function (next) {
  this.slug = slugify(this.name.toLowerCase());
  next();
});

export const SubCategory: Model<ISubCategory> = mongoose.model<ISubCategory>(
  "SubCategory",
  subCategorySchema
);
