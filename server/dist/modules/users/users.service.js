"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../lib/errors");
const userModel_1 = require("../../models/userModel");
const utils_1 = require("../../utils/utils");
class UserService {
    // @desc Register a new user
    // @router /api/users/register
    // @access public
    async registerUser(userData) {
        const { name, email, password } = userData;
        try {
            const userExist = await userModel_1.User.findOne({ email });
            if (userExist) {
                return { error: new errors_1.HttpBadRequestError("User already exist.", []) };
            }
            const newUser = await userModel_1.User.create({
                name,
                email,
                password,
            });
            if (newUser) {
                const { password: _, ...userData } = newUser.toObject();
                return { data: userData };
            }
            else {
                return { error: new errors_1.HttpBadRequestError("Invalid user data", []) };
            }
        }
        catch (error) {
            console.log(error);
            return {
                error: new errors_1.HttpInternalServerError("An error occurred during registration."),
            };
        }
    }
    // @desc Login a user
    // @router /api/users/login
    // @access public
    async loginUser(userData) {
        const { email, password } = userData;
        try {
            const user = await userModel_1.User.findOne({ email });
            if (user && (await user.comparePassword(password, user.password))) {
                const token = (0, utils_1.generateToken)(user._id);
                const { password: _, ...userData } = user.toObject();
                return { data: { ...userData, token } };
            }
            else {
                return { error: new errors_1.HttpBadRequestError("Invalid credentials", []) };
            }
        }
        catch (error) {
            console.log(error);
            return {
                error: new errors_1.HttpInternalServerError("Internal server error"),
            };
        }
    }
    // @desc Get User Profile
    // @router /api/users/profile
    // @access public
    async profile(id) {
        try {
            const user = await userModel_1.User.findById(id);
            if (!user) {
                return { error: new errors_1.HttpNotFoundError("User not found", []) };
            }
            const { password: _, ...userData } = user.toObject();
            return { data: userData };
        }
        catch (error) {
            console.log(error);
            return {
                error: new errors_1.HttpNotFoundError("User not found", []),
            };
        }
    }
    // @desc Update User Profile
    // @router /api/users/profile
    // @access public
    async updateProfile(id, updateData) {
        try {
            const user = await userModel_1.User.findById(id);
            if (user) {
                // Update fields only if they are provided in updateData
                if (updateData.name)
                    user.name = updateData.name;
                if (updateData.email)
                    user.email = updateData.email;
                if (updateData.password)
                    user.password = updateData.password;
                if (updateData.address)
                    user.address = updateData.address;
                if (updateData.phone)
                    user.phone = updateData.phone;
                if (updateData.isActive !== undefined)
                    user.isActive = updateData.isActive;
                await user.save();
                const { password: _, ...userData } = user.toObject();
                return { data: userData };
            }
            else {
                return { error: new errors_1.HttpNotFoundError("User not found", []) };
            }
        }
        catch (error) {
            console.error("Error updating profile:", error);
            return {
                error: new errors_1.HttpInternalServerError("Internal server error"),
            };
        }
    }
    // @desc Get All Users Profile
    // @router /api/users/profile
    // @access public
    async getAllProfiles() {
        try {
            const users = await userModel_1.User.find();
            console.log();
            if (users) {
                return { data: users };
            }
            else {
                return { error: new errors_1.HttpNotFoundError("Users not found", []) };
            }
        }
        catch (error) {
            console.log(error);
            return {
                error: new errors_1.HttpInternalServerError("Internal server error"),
            };
        }
    }
    async deleteUserProfile(id) {
        try {
            const user = await userModel_1.User.findByIdAndDelete(id);
            console.log("user ===>", user);
            if (user) {
                return { data: user };
            }
            else {
                return { error: new errors_1.HttpNotFoundError("User doesn't exist", []) };
            }
        }
        catch (error) {
            console.error("Error deleting user profile:", error);
            return {
                error: new errors_1.HttpInternalServerError("Internal server error. Unable to delete user"),
            };
        }
    }
}
exports.default = UserService;
