import { ISubscription } from "@/models/vendorModel";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Schema as MongooseSchema } from "mongoose";

export class CreateVendorDto {
  @IsNotEmpty()
  user: MongooseSchema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  storeName: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  storeDescription: string;

  @IsString()
  @IsNotEmpty()
  storeImage: string;

  @IsString()
  @IsNotEmpty()
  storeBanner: string;
}

class SubscriptionDto {
  @IsEnum(["basic", "premium"])
  @IsOptional()
  plan?: "basic" | "premium";

  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateVendorDto {
  @IsString({ message: "Store name must be a string" })
  @IsOptional()
  storeName?: string;

  @IsString({ message: "Store description must be a string" })
  @IsOptional()
  storeDescription?: string;

  @IsString({ message: "Store image must be a string" })
  @IsOptional()
  storeImage?: string;

  @IsString({ message: "Store banner must be a string" })
  @IsOptional()
  storeBanner?: string;

  @IsBoolean({ message: "IsVerified must be a boolean" })
  @IsOptional()
  isVerified?: boolean;

  @IsArray({ message: "Products must be an array" })
  @IsOptional()
  @IsString({ each: true, message: "Each product must be a string" })
  products?: string[];

  @IsObject({ message: "Subscription must be an object" })
  @IsOptional()
  @ValidateNested()
  @Type(() => SubscriptionDto)
  subscription?: Partial<ISubscription>;
}
