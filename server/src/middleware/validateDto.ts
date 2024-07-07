import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateDto(dtoClass: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const output = plainToInstance(dtoClass, req.body);
    validate(output).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.map((error) => ({
            property: error.property,
            constraints: error.constraints,
          })),
        });
      } else {
        req.body = output;
        next();
      }
    });
  };
}
