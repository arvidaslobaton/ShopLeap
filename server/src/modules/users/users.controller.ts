import { type NextFunction, type Request, type Response } from "express";
import UserService from "./users.service";
import Api from "../../lib/api";
import { HttpStatusCode } from "axios";
import {
  HttpBadRequestError,
  HttpInternalServerError,
  HttpNotFoundError,
  HttpUnAuthorizedError,
} from "../../lib/errors";

export default class UserController extends Api {
  private readonly usersService = new UserService();

  public registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.usersService.registerUser(req.body);
      if (user.error) {
        console.log("user error ===>", user.error);

        if (user.error instanceof HttpBadRequestError) {
          this.send(
            res,
            user,
            HttpStatusCode.BadRequest,
            "User registration not successful."
          );
        } else {
          // Handle other unexpected errors
          return next(new HttpInternalServerError("Internal server error"));
        }
      }

      this.send(
        res,
        user,
        HttpStatusCode.Created,
        "User registered successfully"
      );
    } catch (error) {
      if (error instanceof HttpBadRequestError) {
        res.status(HttpStatusCode.BadRequest).json({
          message: error.message,
          errors: error.statusCode,
        });
      } else {
        // Handle other unexpected errors
        next(new HttpInternalServerError("Internal server error"));
      }
    }
  };

  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.usersService.loginUser(req.body);

      if (user.error) {
        console.log("user error ===>", user.error);

        if (user.error instanceof HttpBadRequestError) {
          this.send(
            res,
            user,
            HttpStatusCode.BadRequest,
            "User login was not successful. Invalid credentials."
          );
        } else {
          return next(new HttpInternalServerError("Internal server error"));
        }
      }

      this.send(res, user, HttpStatusCode.Ok, "loginUser");
    } catch (error) {
      if (error instanceof HttpBadRequestError) {
        res.status(HttpStatusCode.BadRequest).json({
          message: error.message,
          errors: error.statusCode,
        });
      } else {
        // Handle other unexpected errors
        next(new HttpInternalServerError("Internal server error"));
      }
    }
  };

  public userProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.usersService.profile(req.body._id);

      if (user.error) {
        console.log("user error ===>", user);

        if (user.error instanceof HttpNotFoundError) {
          this.send(res, user, HttpStatusCode.NotFound, "User does not exist.");
        } else {
          return next(new HttpInternalServerError("Internal server error"));
        }
      }
      this.send(res, user, HttpStatusCode.Ok, "userProfile");
    } catch (error) {
      next(new HttpInternalServerError("Internal server error"));
    }
  };

  public updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?._id as string;
      // console.log("userId ===>", req.user);
      // if (!userId) {
      //   this.send(res, "", HttpStatusCode.Unauthorized, "Not Authorized.");
      // }

      const user = await this.usersService.updateProfile(userId, req.body);

      if (user.error) {
        // console.log("user error ===>", user);

        if (user.error instanceof HttpNotFoundError) {
          this.send(res, user, HttpStatusCode.NotFound, "User does not exist.");
        } else {
          return next(new HttpInternalServerError("Internal server error"));
        }
      }

      this.send(res, user, HttpStatusCode.Ok, "updateUserProfile");
    } catch (error) {
      next(new HttpInternalServerError("Internal server error"));
    }
  };

  public getAllProfiles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.usersService.getAllProfiles();
      this.send(res, user, HttpStatusCode.Ok, "getAllProfiles");
    } catch (error) {
      if (error instanceof HttpUnAuthorizedError) {
        res.status(HttpStatusCode.Unauthorized).json({
          message: error.message,
          errors: error.statusCode,
        });
      } else {
        // Handle other unexpected errors
        next(new HttpInternalServerError("Internal server error"));
      }
      // next(new HttpInternalServerError("Internal server error"));
    }
  };

  public deleteProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.usersService.deleteUserProfile(req.params.id);
      // console.log("user ===>", user);

      if (user.error instanceof HttpNotFoundError) {
        this.send(
          res,
          user,
          HttpStatusCode.NotFound,
          "User deletion not successful."
        );
      } else {
        // Handle other unexpected errors
        return next(new HttpInternalServerError("Internal server error"));
      }

      this.send(res, user, HttpStatusCode.Ok, "deleteUserProfile");
    } catch (error) {
      next(new HttpInternalServerError("Internal server error"));
    }
  };
}
