import jwt, { JwtPayload } from "jsonwebtoken";
import { HttpInternalServerError, HttpUnAuthorizedError } from "../lib/errors";
import { User } from "../models/userModel";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "axios";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: any;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const secret = process.env.JWT_SECRET as string;
      const decoded: JwtPayload = jwt.verify(token, secret, {
        complete: true,
      }) as JwtPayload;

      const user = await User.findById(decoded.payload.id).select("-password");

      if (!user) {
        throw new HttpUnAuthorizedError("User not found"); // Handle case where user is not found
      }

      req.user = user;

      next();
    } catch (error) {
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

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user!.role)) {
      // throw new HttpUnAuthorizedError("Not authorized to access this route");
      res.status(403).json({
        status: false,
        message: "Not authorized to access this route",
      });
    }
    next();
  };
};
