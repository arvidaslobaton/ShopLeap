import mongoose, { Document, Model } from "mongoose";

export interface IOrderItem extends Document {
  product: mongoose.Types.ObjectId;
  color: string;
  size: string;
  quantity: number;
  price: number;
}

export interface ICancellation extends Document {
  reason: string;
  createdAt: Date;
}

export interface IReturn extends Document {
  reason: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  totalPrice: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  address: {
    street: string;
    city: string;
    zip: string;
    state: string;
    country: string;
  };
  paymentMethod: "card" | "paypal" | "cash_on_delivery";
  cancellation?: ICancellation;
  return?: IReturn;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderItemSchema = new mongoose.Schema<IOrderItem>(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
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
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false, timestamps: true }
);

const cancellationSchema = new mongoose.Schema<ICancellation>(
  {
    reason: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { _id: false }
);

const returnSchema = new mongoose.Schema<IReturn>(
  {
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    totalPrice: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    address: {
      street: String,
      city: String,
      zip: String,
      state: String,
      country: String,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "paypal", "cash_on_delivery"],
      required: true,
    },
    cancellation: cancellationSchema,
    return: returnSchema,
  },
  { timestamps: true }
);

export const Order: Model<IOrder> = mongoose.model<IOrder>(
  "Order",
  orderSchema
);
