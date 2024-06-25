import mongoose, { Document, Model } from "mongoose";
import slugify from "slugify";

export interface ISubscription {
  plan: "basic" | "premium";
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export interface IVendor extends Document {
  user: mongoose.Schema.Types.ObjectId;
  storeName: string;
  slug: string;
  storeDescription: string;
  storeImage: string;
  storeBanner: string;
  isVerified: boolean;
  products: mongoose.Schema.Types.ObjectId[];
  subscription: ISubscription;
}

const subscriptionSchema = new mongoose.Schema<ISubscription>(
  {
    plan: {
      type: String,
      enum: ["basic", "premium"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

const vendorSchema = new mongoose.Schema<IVendor>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storeName: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    storeDescription: {
      type: String,
      required: true,
    },
    storeImage: {
      type: String,
      required: true,
    },
    storeBanner: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    subscription: subscriptionSchema,
  },
  {
    timestamps: true,
  }
);

vendorSchema.pre("save", async function (next) {
  this.slug = slugify(this.storeName.toLowerCase());
  next();
});

export const Vendor: Model<IVendor> = mongoose.model<IVendor>(
  "Vendor",
  vendorSchema
);
