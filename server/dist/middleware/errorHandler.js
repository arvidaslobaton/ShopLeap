"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundErrorHandler = void 0;
const notFoundErrorHandler = (err, req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.notFoundErrorHandler = notFoundErrorHandler;
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        status: false,
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? "" : err.stack,
    });
};
exports.errorHandler = errorHandler;
