import mongoose, { Document, Model } from "mongoose";

export interface IProductVariation {
  color: string;
  size: string;
  quantity: number;
  price: number;
}

export interface IProduct extends Document {
  name: string;
  description?: string;
  vendor: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  subCategory?: mongoose.Types.ObjectId;
  brand: mongoose.Types.ObjectId;
  image: string[];
  variations: IProductVariation[];
  ratingAverage: number;
  ratingQuantity: number;
  reviews: mongoose.Types.ObjectId[];
}

const productVariationSchema = new mongoose.Schema<IProductVariation>({
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    min: 0,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    image: [String],
    variations: [productVariationSchema],
    ratingAverage: {
      type: Number,
      default: 0,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);
