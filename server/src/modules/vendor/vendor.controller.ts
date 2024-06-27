import { Request, Response, NextFunction } from "express";
import VendorService from "./vendor.service";
import Api from "../../lib/api";
import { HttpStatusCode } from "axios";

export default class VendorController extends Api {
  private readonly vendorService = new VendorService();

  // @desc Create a new Vendor
  // @router /api/vendor
  // @access Private
  public createVendor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const newVendor = await this.vendorService.createVendor(req.body);
      if (!newVendor) {
        this.send(
          res,
          newVendor,
          HttpStatusCode.BadRequest,
          "Must provide valid data"
        );
      }

      this.send(res, newVendor, HttpStatusCode.Created, "Vendor Created");
    } catch (error) {
      console.log(error);
    }
  };

  // @desc Get Vendors
  // @router /api/vendor/all-vendors
  // @access Public
  public getVendors = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const vendors = await this.vendorService.getVendors();

      this.send(res, vendors, HttpStatusCode.Created, "All Vendors");
    } catch (error) {
      console.log(error);
    }
  };

  // @desc Get Vendors
  // @router /api/vendor/vendors
  // @access Public
  public getVendorBySlug = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const vendorBySlug = await this.vendorService.getVendorBySlug(
        req.params.slug
      );

      const statusCode = vendorBySlug?.error
        ? HttpStatusCode.NotFound
        : HttpStatusCode.Ok;

      this.send(res, vendorBySlug, statusCode, "Get Vendor By Slug");
    } catch (error) {
      console.error(error);
      next(error); // pass the error to the error handling middleware
    }
  };
  // @desc Update Vendor
  // @router /api/vendor/:id
  // @access Private
  public updateVendor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const updatedVendor = await this.vendorService.updateVendor(
        req.params.id,
        req.body
      );

      const statusCode = updatedVendor?.error
        ? HttpStatusCode.NotFound
        : HttpStatusCode.Ok;

      this.send(res, updatedVendor, statusCode, "Update Vendor");
    } catch (error) {
      console.error(error);
      next(error); // pass the error to the error handling middleware
    }
  };

  // @desc Delete Vendor
  // @router /api/vendor/:id
  // @access Private
  public deleteVendor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const vendor = await this.vendorService.deleteVendor(req.params.id);

      const statusCode = vendor?.error
        ? HttpStatusCode.NotFound
        : HttpStatusCode.Ok;

      this.send(res, vendor, statusCode, "Delete Vendor");
    } catch (error) {
      console.error(error);
      next(error); // pass the error to the error handling middleware
    }
  };
}
