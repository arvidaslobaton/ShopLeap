import { CreateVendorDto, UpdateVendorDto } from "@/dto/vendor.dto";
import { Vendor } from "../../models/vendorModel";
import { HttpBadRequestError, HttpNotFoundError } from "../../lib/errors";

export default class VendorService {
  public async createVendor(vendor: CreateVendorDto) {
    try {
      const newVendor = await Vendor.create(vendor);

      return { data: newVendor };
    } catch (error) {
      console.log(error);
    }
  }

  public async getVendors() {
    try {
      const vendors = await Vendor.find();

      return { data: vendors };
    } catch (error) {
      console.log(error);
    }
  }

  public async getVendorBySlug(slug: string) {
    try {
      const vendorSlug = await Vendor.findOne({ slug: slug }).populate(
        "user",
        "-password"
      );
      if (!vendorSlug) {
        return {
          error: new HttpNotFoundError(
            "Vendor with the given slug not found",
            []
          ),
        };
      }
      return { data: vendorSlug };
    } catch (error) {
      console.error(error);
      return {
        error: new Error("An error occurred while fetching the vendor"),
      };
    }
  }

  public async updateVendor(id: string, vendorData: UpdateVendorDto) {
    try {
      const vendor = await Vendor.findByIdAndUpdate(id, vendorData, {
        new: true,
      });
      if (!vendor) {
        return { error: new HttpNotFoundError("Vendor not found", []) };
      }
      return { data: vendor };
    } catch (error) {
      console.error(error);
      return {
        error: new Error("An error occurred while updating the vendor"),
      };
    }
  }

  public async deleteVendor(id: string) {
    try {
      const vendor = await Vendor.findByIdAndDelete(id);
      if (!vendor) {
        return { error: new HttpNotFoundError("Vendor not found", []) };
      }
      return { data: vendor };
    } catch (error) {
      console.error(error);
      return {
        error: new Error("An error occurred while deleting the vendor"),
      };
    }
  }
}
