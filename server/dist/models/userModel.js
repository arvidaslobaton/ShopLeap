"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "vendor", "admin"],
        default: "user",
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
    },
    phone: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        next();
    this.password = await bcrypt_1.default.hash(this.password, 12);
    next();
});
userSchema.methods.comparePassword = async function (candidatePassword, userPassword) {
    console.log("candidatePassword:", candidatePassword, "userPassword:", userPassword);
    return await bcrypt_1.default.compare(candidatePassword, userPassword);
};
exports.User = mongoose_1.default.model("User", userSchema);
