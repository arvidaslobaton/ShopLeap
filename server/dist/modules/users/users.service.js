"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../lib/errors");
const userModel_1 = require("../../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_1 = require("@/utils/utils");
class UserService {
    async registerUser(userData) {
        const { name, email, password } = userData;
        try {
            const userExist = await userModel_1.User.findOne({ email });
            if (userExist) {
                throw new errors_1.HttpBadRequestError("User already exist.", []);
            }
            const hashedPassword = await bcrypt_1.default.hash(password, 12);
            const newUser = await userModel_1.User.create({
                name,
                email,
                password: hashedPassword,
            });
            if (newUser) {
                const { password: _, ...userData } = newUser.toObject();
                return userData;
            }
            else {
                throw new errors_1.HttpBadRequestError("Invalid user data", []);
            }
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async loginUser(userData) {
        const { email, password } = userData;
        try {
            const user = await userModel_1.User.findOne({ email });
            if (user && (await bcrypt_1.default.compare(password, user.password))) {
                const token = (0, utils_1.generateToken)(user._id);
                const { password: _, ...userData } = user.toObject();
                return { ...userData, token };
            }
            else {
                throw new errors_1.HttpBadRequestError("Invalid credentials", []);
            }
        }
        catch (error) {
            console.log(error);
            throw new errors_1.HttpBadRequestError("Invalid credentials", []);
        }
    }
}
exports.default = UserService;
