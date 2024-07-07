"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../lib/errors");
const userModel_1 = require("../models/userModel");
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const secret = process.env.JWT_SECRET;
            const decoded = jsonwebtoken_1.default.verify(token, secret, {
                complete: true,
            });
            const user = await userModel_1.User.findById(decoded.payload.id).select("-password");
            if (!user) {
                throw new errors_1.HttpUnAuthorizedError("User not found"); // Handle case where user is not found
            }
            req.user = user;
            next();
        }
        catch (error) {
            // Handle other unexpected errors
            // next(new HttpUnAuthorizedError("Unauthorized user"));
            res
                .status(401)
                .json({ status: false, message: "Not authorized, no token provided" });
        }
    }
    if (!token) {
        // throw new HttpUnAuthorizedError(
        //   "Not authorized, no token attached to the Header"
        // );
        res
            .status(401)
            .json({ status: false, message: "Not authorized, no token provided" });
    }
};
exports.protect = protect;
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            // throw new HttpUnAuthorizedError("Not authorized to access this route");
            res.status(403).json({
                status: false,
                message: "Not authorized to access this route",
            });
        }
        next();
    };
};
exports.authorize = authorize;
