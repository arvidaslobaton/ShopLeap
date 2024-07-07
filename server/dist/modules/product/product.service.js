"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../lib/errors");
const productModel_1 = require("../../models/productModel");
class ProductService {
    async createProduct(createProductData) {
        try {
            const newProduct = await productModel_1.Product.create(createProductData);
            if (!newProduct) {
                console.log("Failed to create new product");
                return { error: new errors_1.HttpBadRequestError("Invalid product data", []) };
            }
            return { data: newProduct };
        }
        catch (error) {
            console.log("Error creating product:", error);
            return {
                error: new errors_1.HttpBadRequestError("An error occurred during product creation", []),
            };
        }
    }
    async getAllProducts() {
        try {
            const products = await productModel_1.Product.find();
            return { data: products };
        }
        catch (error) {
            console.log(error);
        }
    }
    async getProductBySlug(slug) {
        try {
            const product = await productModel_1.Product.findOne({ slug: slug });
            if (!product) {
                return { error: new errors_1.HttpNotFoundError("Product not found", []) };
            }
            return { data: product };
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateProduct(id, updateProductData) {
        try {
            const updatedProduct = await productModel_1.Product.findByIdAndUpdate(id, updateProductData, {
                new: true,
            });
            if (!updatedProduct) {
                return { error: new errors_1.HttpNotFoundError("Product not found", []) };
            }
            return { data: updatedProduct };
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteProduct(id) {
        try {
            const deletedProduct = await productModel_1.Product.findByIdAndDelete(id);
            if (!deletedProduct) {
                return { error: new errors_1.HttpNotFoundError("Product not found", []) };
            }
            return { data: deletedProduct };
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = ProductService;
