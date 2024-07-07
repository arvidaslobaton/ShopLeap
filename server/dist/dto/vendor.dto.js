"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVendorDto = exports.CreateVendorDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class CreateVendorDto {
    user;
    storeName;
    slug;
    storeDescription;
    storeImage;
    storeBanner;
}
exports.CreateVendorDto = CreateVendorDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Schema.Types.ObjectId)
], CreateVendorDto.prototype, "user", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVendorDto.prototype, "storeName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVendorDto.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVendorDto.prototype, "storeDescription", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVendorDto.prototype, "storeImage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVendorDto.prototype, "storeBanner", void 0);
class SubscriptionDto {
    plan;
    startDate;
    endDate;
    isActive;
}
__decorate([
    (0, class_validator_1.IsEnum)(["basic", "premium"]),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SubscriptionDto.prototype, "plan", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], SubscriptionDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], SubscriptionDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SubscriptionDto.prototype, "isActive", void 0);
class UpdateVendorDto {
    storeName;
    storeDescription;
    storeImage;
    storeBanner;
    isVerified;
    products;
    subscription;
}
exports.UpdateVendorDto = UpdateVendorDto;
__decorate([
    (0, class_validator_1.IsString)({ message: "Store name must be a string" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVendorDto.prototype, "storeName", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Store description must be a string" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVendorDto.prototype, "storeDescription", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Store image must be a string" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVendorDto.prototype, "storeImage", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Store banner must be a string" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVendorDto.prototype, "storeBanner", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({ message: "IsVerified must be a boolean" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateVendorDto.prototype, "isVerified", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: "Products must be an array" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true, message: "Each product must be a string" }),
    __metadata("design:type", Array)
], UpdateVendorDto.prototype, "products", void 0);
__decorate([
    (0, class_validator_1.IsObject)({ message: "Subscription must be an object" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SubscriptionDto),
    __metadata("design:type", Object)
], UpdateVendorDto.prototype, "subscription", void 0);
