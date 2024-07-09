import { CreateBrandDto, UpdateBrandDto } from "@/dto/brand.dto";
import { HttpBadRequestError, HttpNotFoundError } from "../../lib/errors";
import { Brand } from "../../models/brandModel";

export default class BrandService {
  public async createBrand(createBrandData: CreateBrandDto) {
    try {
      const newBrand = await Brand.create(createBrandData);

      if (!newBrand) {
        console.log("Failed to create new product");
        return { error: new HttpBadRequestError("Invalid product data", []) };
      }

      return { data: newBrand };
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

  public async getAllBrands() {
    try {
      const brands = await Brand.find();

      return { brands: brands };
    } catch (error) {
      console.log(error);
    }
  }

  public async getBrandBySlug(slug: string) {
    try {
      const product = await Brand.findOne({ slug: slug });

      if (!product) {
        return { error: new HttpNotFoundError("Brand not found", []) };
      }

      return { data: product };
    } catch (error) {
      console.log(error);
    }
  }

  public async updateBrand(id: string, updateBrandData: UpdateBrandDto) {
    try {
      const updatedBrand = await Brand.findByIdAndUpdate(id, updateBrandData, {
        new: true,
      });

      if (!updatedBrand) {
        return { error: new HttpNotFoundError("Brand not found", []) };
      }

      return { data: updatedBrand };
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteBrand(id: string) {
    try {
      const deletedBrand = await Brand.findByIdAndDelete(id);

      if (!deletedBrand) {
        return { error: new HttpNotFoundError("Brand not found", []) };
      }

      return { data: deletedBrand };
    } catch (error) {
      console.log(error);
    }
  }
}
