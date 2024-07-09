import { Type } from "class-transformer";
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  Validate,
  ValidateNested,
} from "class-validator";
import { isValidObjectId } from "mongoose";

class VendorReplyDto {
  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsDateString()
  @IsOptional()
  createdAt?: Date;
}

export class CreateReviewDto {
  @Validate(isValidObjectId, {
    message: "user must be a valid ObjectId",
  })
  @IsNotEmpty()
  user: string;

  @Validate(isValidObjectId, {
    message: "product must be a valid ObjectId",
  })
  @IsNotEmpty()
  product: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsOptional()
  comment: string;

  @ValidateNested()
  @Type(() => VendorReplyDto)
  @IsOptional()
  vendorReply?: VendorReplyDto;
}

export class UpdateReviewDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @IsString()
  @IsOptional()
  comment?: string;

  @ValidateNested()
  @Type(() => VendorReplyDto)
  @IsOptional()
  vendorReply?: VendorReplyDto;
}
