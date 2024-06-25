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
            this.send(res, user, axios_1.HttpStatusCode.Created, "createUser");
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
}
exports.default = UserController;
