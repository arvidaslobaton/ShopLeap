"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const subCategory_service_1 = __importDefault(require("./subCategory.service"));
class SubCategoryController {
    subCategoryService = new subCategory_service_1.default();
    // @desc Create a new subCategory
    // @router /api/subCategory/
    // @access Private
    createSubCategory = async (req, res, next) => {
        try {
            const newSubCategory = await this.subCategoryService.createSubCategory(req.body);
            if (newSubCategory?.error) {
                res.status(400).json({ status: false, error: newSubCategory.error });
            }
            res.status(201).json({ status: true, data: newSubCategory });
        }
        catch (error) {
            console.log(error);
        }
    };
    // @desc Get all subCategories
    // @router /api/subCategory/all
    // @access Public
    getAllSubCategories = async (req, res, next) => {
        try {
            const allSubCategories = await this.subCategoryService.getAllSubCategories();
            res.status(201).json({ status: true, data: allSubCategories });
        }
        catch (error) {
            console.log(error);
        }
    };
    // @desc get subCategory
    // @router /api/subCategory/:slug
    // @access Public
    getSubCategoryBySlug = async (req, res, next) => {
        try {
            const subCategory = await this.subCategoryService.getSubCategoryBySlug(req.params.slug);
            if (!subCategory) {
                res.status(400).json({ status: false, error: "SubCategory not found" });
            }
            if (subCategory?.error) {
                res.status(400).json({ status: false, error: subCategory.error });
            }
            res.status(201).json({ status: true, data: subCategory });
        }
        catch (error) {
            console.log(error);
        }
    };
    // @desc Update a subCategory
    // @router /api/subCategory/:id
    // @access Public
    updateSubCategory = async (req, res, next) => {
        try {
            const updatedSubCategory = await this.subCategoryService.updateSubCategory(req.params.id, req.body);
            if (!updatedSubCategory) {
                res.status(400).json({ status: false, error: "SubCategory not found" });
            }
            if (updatedSubCategory?.error) {
                res
                    .status(400)
                    .json({ status: false, error: updatedSubCategory.error });
            }
            res.status(201).json({ status: true, data: updatedSubCategory });
        }
        catch (error) {
            console.log(error);
        }
    };
    // @desc Update a subCategory
    // @router /api/subCategory/:id
    // @access Public
    deleteSubCategory = async (req, res, next) => {
        try {
            const deletedSubCategory = await this.subCategoryService.deleteSubCategory(req.params.id);
            if (deletedSubCategory?.error) {
                return res
                    .status(400)
                    .json({ status: false, error: deletedSubCategory.error });
            }
            res
                .status(201)
                .json({ status: true, message: "SubCategory deleted successfully" });
        }
        catch (error) {
            console.log(error);
        }
    };
}
exports.default = SubCategoryController;
