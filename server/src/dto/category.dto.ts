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

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @Validate(isValidObjectId, {
    message: "subCategory must be a valid ObjectId",
  })
  @IsOptional()
  subCategory: string;
}

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @Validate(isValidObjectId, { message: "vendor must be a valid ObjectId" })
  @IsOptional()
  subCategory: string;
}
