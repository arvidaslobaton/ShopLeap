"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = __importDefault(require("./product.service"));
class ProductController {
    productService = new product_service_1.default();
    // @desc Create a new product
    // @router /api/product/
    // @access Private
    createProduct = async (req, res, next) => {
        try {
            const newProduct = await this.productService.createProduct(req.body);
            if (newProduct?.error) {
                res.status(400).json({ status: false, error: newProduct.error });
            }
            res.status(201).json({ status: true, data: newProduct });
        }
        catch (error) {
            console.log(error);
        }
    };
    // @desc Get all products
    // @router /api/product/all
    // @access Public
    getAllProducts = async (req, res, next) => {
        try {
            const allProducts = await this.productService.getAllProducts();
            res.status(201).json({ status: true, data: allProducts });
        }
        catch (error) {
            console.log(error);
        }
    };
    // @desc get product
    // @router /api/product/:slug
    // @access Public
    getProductBySlug = async (req, res, next) => {
        try {
            const product = await this.productService.getProductBySlug(req.params.slug);
            if (!product) {
                res.status(400).json({ status: false, error: "Product not found" });
            }
            if (product?.error) {
                res.status(400).json({ status: false, error: product.error });
            }
            res.status(201).json({ status: true, data: product });
        }
        catch (error) {
            console.log(error);
        }
    };
    // @desc Update a product
    // @router /api/product/:id
    // @access Public
    updateProduct = async (req, res, next) => {
        try {
            const updatedProduct = await this.productService.updateProduct(req.params.id, req.body);
            if (!updatedProduct) {
                res.status(400).json({ status: false, error: "Product not found" });
            }
            if (updatedProduct?.error) {
                res.status(400).json({ status: false, error: updatedProduct.error });
            }
            res.status(201).json({ status: true, data: updatedProduct });
        }
        catch (error) {
            console.log(error);
        }
    };
    // @desc Update a product
    // @router /api/product/:id
    // @access Public
    deleteProduct = async (req, res, next) => {
        try {
            const deletedProduct = await this.productService.deleteProduct(req.params.id);
            if (deletedProduct?.error) {
                return res
                    .status(400)
                    .json({ status: false, error: deletedProduct.error });
            }
            res
                .status(201)
                .json({ status: true, message: "Product deleted successfully" });
        }
        catch (error) {
            console.log(error);
        }
    };
}
exports.default = ProductController;
