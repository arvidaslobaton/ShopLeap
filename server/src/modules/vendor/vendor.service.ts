import { CreateVendorDto, UpdateVendorDto } from "@/dto/vendor.dto";
import { Vendor } from "../../models/vendorModel";
import { HttpNotFoundError } from "../../lib/errors";

export default class VendorService {
  public async createVendor(vendor: CreateVendorDto) {
    try {
      const newVendor = await Vendor.create(vendor);
      console.log("newVendor1 ===>", newVendor);

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
      const vendor = await Vendor.findOne({ slug: slug }).populate(
        "user",
        "-password"
      );
      return { data: vendor };
    } catch (error) {
      console.log(error);
    }
  }

  public async updateVendor(id: string, vendorData: UpdateVendorDto) {
    try {
      const vendor = await Vendor.findByIdAndUpdate(id, vendorData, {
        new: true,
      });
      console.log("newVendor ===>", vendor);
      if (!vendor) {
        return { error: new HttpNotFoundError("Vendor not found", []) };
      }

      return { data: vendor };
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }
}
