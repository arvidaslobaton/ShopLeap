import mongoose, { Schema, Document, Model } from "mongoose";
import slugify from "slugify";

export interface ICategory extends Document {
  name: string;
  description?: string;
  slug: string;
  subCategory?: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const categorySchema = new Schema<ICategory>(
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
    subCategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
  },
  {
    timestamps: true,
  }
);

categorySchema.pre("save", async function (next) {
  this.slug = slugify(this.name.toLowerCase());
  next();
});

export const Category: Model<ICategory> = mongoose.model<ICategory>(
  "Category",
  categorySchema
);
