import { HttpBadRequestError, HttpNotFoundError } from "../../lib/errors";
import { Category } from "../../models/categoryModel";
import { CreateCategoryDto, UpdateCategoryDto } from "../../dto/category.dto";

export default class CategoryService {
  public async createCategory(createCategoryData: CreateCategoryDto) {
    try {
      const newCategory = await Category.create(createCategoryData);

      if (!newCategory) {
        console.log("Failed to create new category");
        return {
          error: new HttpBadRequestError("Invalid category data", []),
        };
      }

      return { data: newCategory };
    } catch (error) {
      console.log("Error creating category:", error);
      return {
        error: new HttpBadRequestError(
          "An error occurred during category creation",
          []
        ),
      };
    }
  }

  public async getAllCategories() {
    try {
      const Categories = await Category.find();

      return { data: Categories };
    } catch (error) {
      console.log(error);
    }
  }

  public async getCategoryBySlug(slug: string) {
    try {
      const category = await Category.findOne({ slug: slug });

      if (!category) {
        return { error: new HttpNotFoundError("category not found", []) };
      }

      return { data: category };
    } catch (error) {
      console.log(error);
    }
  }

  public async updateCategory(
    id: string,
    updateSubCategoryData: UpdateCategoryDto
  ) {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        updateSubCategoryData,
        {
          new: true,
        }
      );

      if (!updatedCategory) {
        return { error: new HttpNotFoundError("Category not found", []) };
      }

      return { data: updatedCategory };
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteCategory(id: string) {
    try {
      const deletedCategory = await Category.findByIdAndDelete(id);

      if (!deletedCategory) {
        return { error: new HttpNotFoundError("Category not found", []) };
      }

      return { data: deletedCategory };
    } catch (error) {
      console.log(error);
    }
  }
}
