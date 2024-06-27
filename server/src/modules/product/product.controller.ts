import { Request, Response, NextFunction } from "express";
import ProductService from "./product.service";

export default class ProductController {
  private readonly productService = new ProductService();

  // @desc Create a new product
  // @router /api/product/
  // @access Private
  public createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const newProduct = await this.productService.createProduct(req.body);

      if (newProduct?.error) {
        res.status(400).json({ status: false, error: newProduct.error });
      }
      res.status(201).json({ status: true, data: newProduct });
    } catch (error) {
      console.log(error);
    }
  };

  // @desc Get all products
  // @router /api/product/all
  // @access Public
  public getAllProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const allProducts = await this.productService.getAllProducts();

      res.status(201).json({ status: true, data: allProducts });
    } catch (error) {
      console.log(error);
    }
  };

  // @desc get product
  // @router /api/product/:slug
  // @access Public
  public getProductBySlug = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const product = await this.productService.getProductBySlug(
        req.params.slug
      );

      if (!product) {
        res.status(400).json({ status: false, error: "Product not found" });
      }

      if (product?.error) {
        res.status(400).json({ status: false, error: product.error });
      }

      res.status(201).json({ status: true, data: product });
    } catch (error) {
      console.log(error);
    }
  };

  // @desc Update a product
  // @router /api/product/:id
  // @access Public
  public updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const updatedProduct = await this.productService.updateProduct(
        req.params.id,
        req.body
      );

      if (!updatedProduct) {
        res.status(400).json({ status: false, error: "Product not found" });
      }

      if (updatedProduct?.error) {
        res.status(400).json({ status: false, error: updatedProduct.error });
      }
      res.status(201).json({ status: true, data: updatedProduct });
    } catch (error) {
      console.log(error);
    }
  };

  // @desc Update a product
  // @router /api/product/:id
  // @access Public
  public deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const deletedProduct = await this.productService.deleteProduct(
        req.params.id
      );
      if (deletedProduct?.error) {
        return res
          .status(400)
          .json({ status: false, error: deletedProduct.error });
      }

      res
        .status(201)
        .json({ status: true, message: "Product deleted successfully" });
    } catch (error) {
      console.log(error);
    }
  };
}
