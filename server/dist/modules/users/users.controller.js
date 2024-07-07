"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("./users.service"));
const api_1 = __importDefault(require("../../lib/api"));
const axios_1 = require("axios");
const errors_1 = require("../../lib/errors");
class UserController extends api_1.default {
    usersService = new users_service_1.default();
    registerUser = async (req, res, next) => {
        try {
            const user = await this.usersService.registerUser(req.body);
            if (user.error) {
                console.log("user error ===>", user.error);
                if (user.error instanceof errors_1.HttpBadRequestError) {
                    this.send(res, user, axios_1.HttpStatusCode.BadRequest, "User registration not successful.");
                }
                else {
                    // Handle other unexpected errors
                    return next(new errors_1.HttpInternalServerError("Internal server error"));
                }
            }
            this.send(res, user, axios_1.HttpStatusCode.Created, "User registered successfully");
        }
        catch (error) {
            if (error instanceof errors_1.HttpBadRequestError) {
                res.status(axios_1.HttpStatusCode.BadRequest).json({
                    message: error.message,
                    errors: error.statusCode,
                });
            }
            else {
                // Handle other unexpected errors
                next(new errors_1.HttpInternalServerError("Internal server error"));
            }
        }
    };
    loginUser = async (req, res, next) => {
        try {
            const user = await this.usersService.loginUser(req.body);
            if (user.error) {
                console.log("user error ===>", user.error);
                if (user.error instanceof errors_1.HttpBadRequestError) {
                    this.send(res, user, axios_1.HttpStatusCode.BadRequest, "User login was not successful. Invalid credentials.");
                }
                else {
                    return next(new errors_1.HttpInternalServerError("Internal server error"));
                }
            }
            this.send(res, user, axios_1.HttpStatusCode.Ok, "loginUser");
        }
        catch (error) {
            if (error instanceof errors_1.HttpBadRequestError) {
                res.status(axios_1.HttpStatusCode.BadRequest).json({
                    message: error.message,
                    errors: error.statusCode,
                });
            }
            else {
                // Handle other unexpected errors
                next(new errors_1.HttpInternalServerError("Internal server error"));
            }
        }
    };
    userProfile = async (req, res, next) => {
        try {
            const user = await this.usersService.profile(req.body._id);
            if (user.error) {
                console.log("user error ===>", user);
                if (user.error instanceof errors_1.HttpNotFoundError) {
                    this.send(res, user, axios_1.HttpStatusCode.NotFound, "User does not exist.");
                }
                else {
                    return next(new errors_1.HttpInternalServerError("Internal server error"));
                }
            }
            this.send(res, user, axios_1.HttpStatusCode.Ok, "userProfile");
        }
        catch (error) {
            next(new errors_1.HttpInternalServerError("Internal server error"));
        }
    };
    updateProfile = async (req, res, next) => {
        try {
            const userId = req.user?._id;
            // console.log("userId ===>", req.user);
            // if (!userId) {
            //   this.send(res, "", HttpStatusCode.Unauthorized, "Not Authorized.");
            // }
            const user = await this.usersService.updateProfile(userId, req.body);
            if (user.error) {
                // console.log("user error ===>", user);
                if (user.error instanceof errors_1.HttpNotFoundError) {
                    this.send(res, user, axios_1.HttpStatusCode.NotFound, "User does not exist.");
                }
                else {
                    return next(new errors_1.HttpInternalServerError("Internal server error"));
                }
            }
            this.send(res, user, axios_1.HttpStatusCode.Ok, "updateUserProfile");
        }
        catch (error) {
            next(new errors_1.HttpInternalServerError("Internal server error"));
        }
    };
    getAllProfiles = async (req, res, next) => {
        try {
            const user = await this.usersService.getAllProfiles();
            this.send(res, user, axios_1.HttpStatusCode.Ok, "getAllProfiles");
        }
        catch (error) {
            if (error instanceof errors_1.HttpUnAuthorizedError) {
                res.status(axios_1.HttpStatusCode.Unauthorized).json({
                    message: error.message,
                    errors: error.statusCode,
                });
            }
            else {
                // Handle other unexpected errors
                next(new errors_1.HttpInternalServerError("Internal server error"));
            }
            // next(new HttpInternalServerError("Internal server error"));
        }
    };
    deleteProfile = async (req, res, next) => {
        try {
            const user = await this.usersService.deleteUserProfile(req.params.id);
            // console.log("user ===>", user);
            if (user.error instanceof errors_1.HttpNotFoundError) {
                this.send(res, user, axios_1.HttpStatusCode.NotFound, "User deletion not successful.");
            }
            else {
                // Handle other unexpected errors
                return next(new errors_1.HttpInternalServerError("Internal server error"));
            }
            this.send(res, user, axios_1.HttpStatusCode.Ok, "deleteUserProfile");
        }
        catch (error) {
            next(new errors_1.HttpInternalServerError("Internal server error"));
        }
    };
}
exports.default = UserController;
