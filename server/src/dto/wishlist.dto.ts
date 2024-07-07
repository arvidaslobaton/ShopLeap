import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Validate,
  ValidateNested,
} from "class-validator";
import { isValidObjectId } from "mongoose";

export class CreateWishlistDto {
  @Validate(isValidObjectId, {
    message: "user must be a valid ObjectId",
  })
  @IsNotEmpty()
  user: string;

  @Validate(isValidObjectId, {
    message: "products must be a valid ObjectId",
  })
  @IsNotEmpty()
  products: string;
}

export class UpdateWishlistDto {
  @Validate(isValidObjectId, {
    message: "user must be a valid ObjectId",
  })
  @IsOptional()
  user: string;

  @Validate(isValidObjectId, {
    message: "products must be a valid ObjectId",
  })
  @IsOptional()
  products: string;
}
