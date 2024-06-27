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
import { Type } from "class-transformer";
import { isValidObjectId } from "mongoose";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Validate(isValidObjectId, { message: "vendor must be a valid ObjectId" })
  @IsNotEmpty()
  vendor: string;
}

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Validate(isValidObjectId, { message: "vendor must be a valid ObjectId" })
  @IsNotEmpty()
  vendor: string;
}
