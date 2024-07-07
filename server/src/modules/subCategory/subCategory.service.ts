import {
  CreateSubCategoryDto,
  UpdateSubCategoryDto,
} from "@/dto/subCategory.dto";
import { HttpBadRequestError, HttpNotFoundError } from "../../lib/errors";
import { SubCategory } from "../../models/subCategoryModel";

export default class SubCategoryService {
  public async createSubCategory(createSubCategoryData: CreateSubCategoryDto) {
    try {
      const newSubCategory = await SubCategory.create(createSubCategoryData);

      if (!newSubCategory) {
        console.log("Failed to create new sub category");
        return {
          error: new HttpBadRequestError("Invalid sub category data", []),
        };
      }

      return { data: newSubCategory };
    } catch (error) {
      console.log("Error creating sub category:", error);
      return {
        error: new HttpBadRequestError(
          "An error occurred during sub category creation",
          []
        ),
      };
    }
  }

  public async getAllSubCategories() {
    try {
      const subCategories = await SubCategory.find();

      return { data: subCategories };
    } catch (error) {
      console.log(error);
    }
  }

  public async getSubCategoryBySlug(slug: string) {
    try {
      const subCategory = await SubCategory.findOne({ slug: slug });

      if (!subCategory) {
        return { error: new HttpNotFoundError("SubCategory not found", []) };
      }

      return { data: subCategory };
    } catch (error) {
      console.log(error);
    }
  }

  public async updateSubCategory(
    id: string,
    updateSubCategoryData: UpdateSubCategoryDto
  ) {
    try {
      const updatedSubCategory = await SubCategory.findByIdAndUpdate(
        id,
        updateSubCategoryData,
        {
          new: true,
        }
      );

      if (!updatedSubCategory) {
        return { error: new HttpNotFoundError("SubCategory not found", []) };
      }

      return { data: updatedSubCategory };
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteSubCategory(id: string) {
    try {
      const deletedSubCategory = await SubCategory.findByIdAndDelete(id);

      if (!deletedSubCategory) {
        return { error: new HttpNotFoundError("SubCategory not found", []) };
      }

      return { data: deletedSubCategory };
    } catch (error) {
      console.log(error);
    }
  }
}
