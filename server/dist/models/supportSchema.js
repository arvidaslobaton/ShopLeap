"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Support = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
}, { _id: false });
const supportSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: [messageSchema],
    status: {
        type: String,
        enum: ["open", "in_progress", "closed"],
        default: "open",
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low",
    },
    category: String,
    assignedTo: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    assignedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});
supportSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});
exports.Support = mongoose_1.default.model("Support", supportSchema);
