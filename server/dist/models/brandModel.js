"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const brandSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
brandSchema.pre("save", async function (next) {
    this.slug = (0, slugify_1.default)(this.name.toLowerCase());
    next();
});
exports.Brand = mongoose_1.default.model("Brand", brandSchema);
