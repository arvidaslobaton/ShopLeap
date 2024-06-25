"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderItemSchema = new mongoose_1.default.Schema({
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { _id: false, timestamps: true });
const cancellationSchema = new mongoose_1.default.Schema({
    reason: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
}, { _id: false });
const returnSchema = new mongoose_1.default.Schema({
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
}, { _id: false });
const orderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true });
exports.Order = mongoose_1.default.model("Order", orderSchema);
