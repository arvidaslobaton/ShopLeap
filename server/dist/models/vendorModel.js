"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendor = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const subscriptionSchema = new mongoose_1.default.Schema({
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
}, { _id: false });
const vendorSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    storeName: {
        type: String,
        required: true,
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
    isVerified: {
        type: Boolean,
        default: false,
    },
    products: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product" }],
    subscription: subscriptionSchema,
}, {
    timestamps: true,
});
exports.Vendor = mongoose_1.default.model("Vendor", vendorSchema);
