"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const utils_1 = require("./utils/utils");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middleware/errorHandler");
const modules_1 = __importDefault(require("./modules"));
dotenv_1.default.config();
(0, utils_1.dbConnect)();
const app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
// Routes
app.use("/api", modules_1.default);
// Error Handler Middleware
app.use(errorHandler_1.errorHandler);
app.use(errorHandler_1.notFoundErrorHandler);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port http//localhost:${PORT}`);
});
