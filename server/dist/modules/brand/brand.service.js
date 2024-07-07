"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../lib/errors");
const brandModel_1 = require("../../models/brandModel");
class BrandService {
    async createBrand(createBrandData) {
        try {
            const newBrand = await brandModel_1.Brand.create(createBrandData);
            if (!newBrand) {
                console.log("Failed to create new product");
                return { error: new errors_1.HttpBadRequestError("Invalid product data", []) };
            }
            return { data: newBrand };
        }
        catch (error) {
            console.log("Error creating product:", error);
            return {
                error: new errors_1.HttpBadRequestError("An error occurred during product creation", []),
            };
        }
    }
    async getAllBrands() {
        try {
            const products = await brandModel_1.Brand.find();
            return { brands: products };
        }
        catch (error) {
            console.log(error);
        }
    }
    async getBrandBySlug(slug) {
        try {
            const product = await brandModel_1.Brand.findOne({ slug: slug });
            if (!product) {
                return { error: new errors_1.HttpNotFoundError("Brand not found", []) };
            }
            return { data: product };
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateBrand(id, updateBrandData) {
        try {
            const updatedBrand = await brandModel_1.Brand.findByIdAndUpdate(id, updateBrandData, {
                new: true,
            });
            if (!updatedBrand) {
                return { error: new errors_1.HttpNotFoundError("Brand not found", []) };
            }
            return { data: updatedBrand };
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteBrand(id) {
        try {
            const deletedBrand = await brandModel_1.Brand.findByIdAndDelete(id);
            if (!deletedBrand) {
                return { error: new errors_1.HttpNotFoundError("Brand not found", []) };
            }
            return { data: deletedBrand };
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = BrandService;
