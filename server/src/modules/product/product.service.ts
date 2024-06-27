import { CreateProductDto, UpdateProductDto } from "@/dto/product.dto";
import { HttpBadRequestError, HttpNotFoundError } from "../../lib/errors";
import { Product } from "../../models/productModel";

export default class ProductService {
  public async createProduct(createProductData: CreateProductDto) {
    try {
      const newProduct = await Product.create(createProductData);

      if (!newProduct) {
        console.log("Failed to create new product");
        return { error: new HttpBadRequestError("Invalid product data", []) };
      }

      return { data: newProduct };
    } catch (error) {
      console.log("Error creating product:", error);
      return {
        error: new HttpBadRequestError(
          "An error occurred during product creation",
          []
        ),
      };
    }
  }

  public async getAllProducts() {
    try {
      const products = await Product.find();

      return { data: products };
    } catch (error) {
      console.log(error);
    }
  }

  public async getProductBySlug(slug: string) {
    try {
      const product = await Product.findOne({ slug: slug });

      if (!product) {
        return { error: new HttpNotFoundError("Product not found", []) };
      }

      return { data: product };
    } catch (error) {
      console.log(error);
    }
  }

  public async updateProduct(id: string, updateProductData: UpdateProductDto) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        updateProductData,
        {
          new: true,
        }
      );

      if (!updatedProduct) {
        return { error: new HttpNotFoundError("Product not found", []) };
      }

      return { data: updatedProduct };
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteProduct(id: string) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        return { error: new HttpNotFoundError("Product not found", []) };
      }

      return { data: deletedProduct };
    } catch (error) {
      console.log(error);
    }
  }
}
