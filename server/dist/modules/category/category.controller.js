"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_service_1 = __importDefault(require("./category.service"));
class SubCategoryController {
    categoryService = new category_service_1.default();
    // @desc Create a new category
    // @router /api/category/
    // @access Private
    createCategory = async (req, res, next) => {
        try {
            const newCategory = await this.categoryService.createCategory(req.body);
            if (newCategory?.error) {
                res.status(400).json({ status: false, error: newCategory.error });
            }
            res.status(201).json({ status: true, data: newCategory });
        }
        catch (error) {
            console.log(error);
        }
    };
    // @desc Get all subCategories
    // @router /api/category/all
    // @access Public
    getAllCategories = async (req, res, next) => {
        try {
            const allCategories = await this.categoryService.getAllCategories();
            res.status(201).json({ status: true, data: allCategories });
        }
        catch (error) {
            console.log(error);
        }
    };
    // @desc get category
    // @router /api/category/:slug
    // @access Public
    getCategoryBySlug = async (req, res, next) => {
        try {
            const category = await this.categoryService.getCategoryBySlug(req.params.slug);
            if (!category) {
                res.status(400).json({ status: false, error: "category not found" });
            }
            if (category?.error) {
                res.status(400).json({ status: false, error: category.error });
            }
            res.status(201).json({ status: true, data: category });
        }
        catch (error) {
            console.log(error);
        }
    };
    // @desc Update a category
    // @router /api/category/:id
    // @access Public
    updateCategory = async (req, res, next) => {
        try {
            const updatedCategory = await this.categoryService.updateCategory(req.params.id, req.body);
            if (!updatedCategory) {
                res.status(400).json({ status: false, error: "category not found" });
            }
            if (updatedCategory?.error) {
                res.status(400).json({ status: false, error: updatedCategory.error });
            }
            res.status(201).json({ status: true, data: updatedCategory });
        }
        catch (error) {
            console.log(error);
        }
    };
    // @desc Update a category
    // @router /api/category/:id
    // @access Public
    deleteCategory = async (req, res, next) => {
        try {
            const deletedCategory = await this.categoryService.deleteCategory(req.params.id);
            if (deletedCategory?.error) {
                return res
                    .status(400)
                    .json({ status: false, error: deletedCategory.error });
            }
            res
                .status(201)
                .json({ status: true, message: "category deleted successfully" });
        }
        catch (error) {
            console.log(error);
        }
    };
}
exports.default = SubCategoryController;
