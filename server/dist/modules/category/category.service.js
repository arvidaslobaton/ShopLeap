"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../lib/errors");
const categoryModel_1 = require("../../models/categoryModel");
class CategoryService {
    async createCategory(createCategoryData) {
        try {
            const newCategory = await categoryModel_1.Category.create(createCategoryData);
            if (!newCategory) {
                console.log("Failed to create new category");
                return {
                    error: new errors_1.HttpBadRequestError("Invalid category data", []),
                };
            }
            return { data: newCategory };
        }
        catch (error) {
            console.log("Error creating category:", error);
            return {
                error: new errors_1.HttpBadRequestError("An error occurred during category creation", []),
            };
        }
    }
    async getAllCategories() {
        try {
            const Categories = await categoryModel_1.Category.find();
            return { data: Categories };
        }
        catch (error) {
            console.log(error);
        }
    }
    async getCategoryBySlug(slug) {
        try {
            const category = await categoryModel_1.Category.findOne({ slug: slug });
            if (!category) {
                return { error: new errors_1.HttpNotFoundError("category not found", []) };
            }
            return { data: category };
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateCategory(id, updateSubCategoryData) {
        try {
            const updatedCategory = await categoryModel_1.Category.findByIdAndUpdate(id, updateSubCategoryData, {
                new: true,
            });
            if (!updatedCategory) {
                return { error: new errors_1.HttpNotFoundError("Category not found", []) };
            }
            return { data: updatedCategory };
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteCategory(id) {
        try {
            const deletedCategory = await categoryModel_1.Category.findByIdAndDelete(id);
            if (!deletedCategory) {
                return { error: new errors_1.HttpNotFoundError("Category not found", []) };
            }
            return { data: deletedCategory };
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = CategoryService;
