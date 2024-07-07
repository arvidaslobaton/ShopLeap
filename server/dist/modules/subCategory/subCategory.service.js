"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../lib/errors");
const subCategoryModel_1 = require("../../models/subCategoryModel");
class SubCategoryService {
    async createSubCategory(createSubCategoryData) {
        try {
            const newSubCategory = await subCategoryModel_1.SubCategory.create(createSubCategoryData);
            if (!newSubCategory) {
                console.log("Failed to create new sub category");
                return {
                    error: new errors_1.HttpBadRequestError("Invalid sub category data", []),
                };
            }
            return { data: newSubCategory };
        }
        catch (error) {
            console.log("Error creating sub category:", error);
            return {
                error: new errors_1.HttpBadRequestError("An error occurred during sub category creation", []),
            };
        }
    }
    async getAllSubCategories() {
        try {
            const subCategories = await subCategoryModel_1.SubCategory.find();
            return { data: subCategories };
        }
        catch (error) {
            console.log(error);
        }
    }
    async getSubCategoryBySlug(slug) {
        try {
            const subCategory = await subCategoryModel_1.SubCategory.findOne({ slug: slug });
            if (!subCategory) {
                return { error: new errors_1.HttpNotFoundError("SubCategory not found", []) };
            }
            return { data: subCategory };
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateSubCategory(id, updateSubCategoryData) {
        try {
            const updatedSubCategory = await subCategoryModel_1.SubCategory.findByIdAndUpdate(id, updateSubCategoryData, {
                new: true,
            });
            if (!updatedSubCategory) {
                return { error: new errors_1.HttpNotFoundError("SubCategory not found", []) };
            }
            return { data: updatedSubCategory };
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteSubCategory(id) {
        try {
            const deletedSubCategory = await subCategoryModel_1.SubCategory.findByIdAndDelete(id);
            if (!deletedSubCategory) {
                return { error: new errors_1.HttpNotFoundError("SubCategory not found", []) };
            }
            return { data: deletedSubCategory };
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = SubCategoryService;
