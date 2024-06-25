import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import { dbConnect } from "./utils/utils";
import morgan from "morgan";
import cors from "cors";
import { errorHandler, notFoundErrorHandler } from "./middleware/errorHandler";
import router from "./modules";

dotenv.config();

dbConnect();

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use("/api", router);

// Error Handler Middleware
app.use(errorHandler);
app.use(notFoundErrorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port http//localhost:${PORT}`);
});
