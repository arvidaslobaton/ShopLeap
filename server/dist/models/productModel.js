"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const productVariationSchema = new mongoose_1.default.Schema({
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
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    description: String,
    vendor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true,
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
    },
    subCategory: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
    },
    brand: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Brand",
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
}, {
    timestamps: true,
});
productSchema.pre("save", async function (next) {
    this.slug = (0, slugify_1.default)(this.name.toLowerCase());
    next();
});
exports.Product = mongoose_1.default.model("Product", productSchema);
