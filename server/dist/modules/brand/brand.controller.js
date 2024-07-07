"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const brand_service_1 = __importDefault(require("./brand.service"));
class BrandController {
    brandService = new brand_service_1.default();
    // @desc Create a new brand
    // @router /api/brand/
    // @access Private
    createBrand = async (req, res, next) => {
        try {
            const newBrand = await this.brandService.createBrand(req.body);
            if (newBrand?.error) {
                res.status(400).json({ status: false, error: newBrand.error });
            }
            res.status(201).json({ status: true, data: newBrand });
        }
        catch (error) {
            console.log(error);
        }
    };
    // @desc Get all brands
    // @router /api/brand/all
    // @access Public
    getAllBrands = async (req, res, next) => {
        try {
            const allBrands = await this.brandService.getAllBrands();
            res.status(201).json({ status: true, data: allBrands });
        }
        catch (error) {
            console.log(error);
        }
    };
    // @desc get brand
    // @router /api/brand/:slug
    // @access Public
    getBrandBySlug = async (req, res, next) => {
        try {
            const brand = await this.brandService.getBrandBySlug(req.params.slug);
            if (!brand) {
                res.status(400).json({ status: false, error: "Brand not found" });
            }
            if (brand?.error) {
                res.status(400).json({ status: false, error: brand.error });
            }
            res.status(201).json({ status: true, data: brand });
        }
        catch (error) {
            console.log(error);
        }
    };
    // @desc Update a brand
    // @router /api/brand/:id
    // @access Public
    updateBrand = async (req, res, next) => {
        try {
            const updatedBrand = await this.brandService.updateBrand(req.params.id, req.body);
            if (!updatedBrand) {
                res.status(400).json({ status: false, error: "Brand not found" });
            }
            if (updatedBrand?.error) {
                res.status(400).json({ status: false, error: updatedBrand.error });
            }
            res.status(201).json({ status: true, data: updatedBrand });
        }
        catch (error) {
            console.log(error);
        }
    };
    // @desc Update a brand
    // @router /api/brand/:id
    // @access Public
    deleteBrand = async (req, res, next) => {
        try {
            const deletedBrand = await this.brandService.deleteBrand(req.params.id);
            if (deletedBrand?.error) {
                return res
                    .status(400)
                    .json({ status: false, error: deletedBrand.error });
            }
            res
                .status(201)
                .json({ status: true, message: "Brand deleted successfully" });
        }
        catch (error) {
            console.log(error);
        }
    };
}
exports.default = BrandController;
