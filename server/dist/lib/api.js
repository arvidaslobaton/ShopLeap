"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
/**
 * `Api` Represents an abstract base class for common expressJS API operations.
 * Inherit this class to use the helper functions.
 */
class Api {
    /**
     * Sends a JSON response to the client with the given data.
     *
     * @template T - The type of the data to be sent in the response.
     * @param res - The express response object.
     * @param data - The data to be sent in the response.
     * @param statusCode - The HTTP status code for the response.
     * @param message - The message accompanying the response.
     * @returns - The express response object with the provided data and status code.
     */
    send(res, data, statusCode = axios_1.HttpStatusCode.Ok, message = "success") {
        return res.status(statusCode).json({
            message,
            data,
        });
    }
    /**
     * Triggers the download of a file from a given path.
     *
     * @param res - The express response object.
     * @param statusCode - The HTTP status code for the response.
     * @param path - The path of the file to be downloaded.
     */
    download(res, statusCode = axios_1.HttpStatusCode.Ok, path) {
        res.status(statusCode).download(path);
    }
}
exports.default = Api;
