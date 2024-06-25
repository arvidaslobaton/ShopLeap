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

      this.send(res, newVendor, HttpStatusCode.Created, "User");
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
      const vendor = await this.vendorService.getVendorBySlug(req.params.slug);

      this.send(res, vendor, HttpStatusCode.Created, "Get Vendor By Slug");
    } catch (error) {
      console.log(error);
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
      const newVendor = await this.vendorService.updateVendor(
        req.params.id,
        req.body
      );

      this.send(res, newVendor, HttpStatusCode.Created, "Update Vendor");
    } catch (error) {
      console.log(error);
    }
  };

  public deleteVendor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const vendor = await this.vendorService.deleteVendor(req.params.id);

      this.send(res, vendor, HttpStatusCode.Created, "Delete Vendor");
    } catch (error) {
      console.log(error);
    }
  };
}
