// src/types/express.d.ts
import { IUser } from "../models/userModel"; // adjust the import path as needed

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // or the appropriate type for your user
    }
  }
}
