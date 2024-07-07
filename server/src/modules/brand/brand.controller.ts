import { Request, Response, NextFunction } from "express";
import BrandService from "./brand.service";

export default class BrandController {
  private readonly brandService = new BrandService();

  // @desc Create a new brand
  // @router /api/brand/
  // @access Private
  public createBrand = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const newBrand = await this.brandService.createBrand(req.body);

      if (newBrand?.error) {
        res.status(400).json({ status: false, error: newBrand.error });
      }
      res.status(201).json({ status: true, data: newBrand });
    } catch (error) {
      console.log(error);
    }
  };

  // @desc Get all brands
  // @router /api/brand/all
  // @access Public
  public getAllBrands = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const allBrands = await this.brandService.getAllBrands();

      res.status(201).json({ status: true, data: allBrands });
    } catch (error) {
      console.log(error);
    }
  };

  // @desc get brand
  // @router /api/brand/:slug
  // @access Public
  public getBrandBySlug = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const brand = await this.brandService.getBrandBySlug(req.params.slug);

      if (!brand) {
        res.status(400).json({ status: false, error: "Brand not found" });
      }

      if (brand?.error) {
        res.status(400).json({ status: false, error: brand.error });
      }

      res.status(201).json({ status: true, data: brand });
    } catch (error) {
      console.log(error);
    }
  };

  // @desc Update a brand
  // @router /api/brand/:id
  // @access Public
  public updateBrand = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const updatedBrand = await this.brandService.updateBrand(
        req.params.id,
        req.body
      );

      if (!updatedBrand) {
        res.status(400).json({ status: false, error: "Brand not found" });
      }

      if (updatedBrand?.error) {
        res.status(400).json({ status: false, error: updatedBrand.error });
      }
      res.status(201).json({ status: true, data: updatedBrand });
    } catch (error) {
      console.log(error);
    }
  };

  // @desc Update a brand
  // @router /api/brand/:id
  // @access Public
  public deleteBrand = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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
    } catch (error) {
      console.log(error);
    }
  };
}
