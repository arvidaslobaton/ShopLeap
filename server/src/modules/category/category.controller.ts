import { Request, Response, NextFunction } from "express";
import CategoryService from "./category.service";

export default class SubCategoryController {
  private readonly categoryService = new CategoryService();

  // @desc Create a new category
  // @router /api/category/
  // @access Private
  public createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const newCategory = await this.categoryService.createCategory(req.body);

      if (newCategory?.error) {
        res.status(400).json({ status: false, error: newCategory.error });
      }
      res.status(201).json({ status: true, data: newCategory });
    } catch (error) {
      console.log(error);
    }
  };

  // @desc Get all subCategories
  // @router /api/category/all
  // @access Public
  public getAllCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const allCategories = await this.categoryService.getAllCategories();

      res.status(201).json({ status: true, data: allCategories });
    } catch (error) {
      console.log(error);
    }
  };

  // @desc get category
  // @router /api/category/:slug
  // @access Public
  public getCategoryBySlug = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const category = await this.categoryService.getCategoryBySlug(
        req.params.slug
      );

      if (!category) {
        res.status(400).json({ status: false, error: "category not found" });
      }

      if (category?.error) {
        res.status(400).json({ status: false, error: category.error });
      }

      res.status(201).json({ status: true, data: category });
    } catch (error) {
      console.log(error);
    }
  };

  // @desc Update a category
  // @router /api/category/:id
  // @access Public
  public updateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const updatedCategory = await this.categoryService.updateCategory(
        req.params.id,
        req.body
      );

      if (!updatedCategory) {
        res.status(400).json({ status: false, error: "category not found" });
      }

      if (updatedCategory?.error) {
        res.status(400).json({ status: false, error: updatedCategory.error });
      }
      res.status(201).json({ status: true, data: updatedCategory });
    } catch (error) {
      console.log(error);
    }
  };

  // @desc Update a category
  // @router /api/category/:id
  // @access Public
  public deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const deletedCategory = await this.categoryService.deleteCategory(
        req.params.id
      );
      if (deletedCategory?.error) {
        return res
          .status(400)
          .json({ status: false, error: deletedCategory.error });
      }

      res
        .status(201)
        .json({ status: true, message: "category deleted successfully" });
    } catch (error) {
      console.log(error);
    }
  };
}
