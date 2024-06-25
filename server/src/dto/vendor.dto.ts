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
  @IsString()
  @IsOptional()
  storeName?: string;

  @IsString()
  @IsOptional()
  storeDescription?: string;

  @IsString()
  @IsOptional()
  storeImage?: string;

  @IsString()
  @IsOptional()
  storeBanner?: string;

  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  products?: string[];

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => SubscriptionDto)
  subscription?: Partial<ISubscription>;
}
