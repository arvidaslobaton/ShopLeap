"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vendorModel_1 = require("../../models/vendorModel");
const errors_1 = require("../../lib/errors");
class VendorService {
    async createVendor(vendor) {
        try {
            const newVendor = await vendorModel_1.Vendor.create(vendor);
            return { data: newVendor };
        }
        catch (error) {
            console.log(error);
        }
    }
    async getVendors() {
        try {
            const vendors = await vendorModel_1.Vendor.find();
            return { data: vendors };
        }
        catch (error) {
            console.log(error);
        }
    }
    async getVendorBySlug(slug) {
        try {
            const vendorSlug = await vendorModel_1.Vendor.findOne({ slug: slug }).populate("user", "-password");
            if (!vendorSlug) {
                return {
                    error: new errors_1.HttpNotFoundError("Vendor with the given slug not found", []),
                };
            }
            return { data: vendorSlug };
        }
        catch (error) {
            console.error(error);
            return {
                error: new Error("An error occurred while fetching the vendor"),
            };
        }
    }
    async updateVendor(id, vendorData) {
        try {
            const vendor = await vendorModel_1.Vendor.findByIdAndUpdate(id, vendorData, {
                new: true,
            });
            if (!vendor) {
                return { error: new errors_1.HttpNotFoundError("Vendor not found", []) };
            }
            return { data: vendor };
        }
        catch (error) {
            console.error(error);
            return {
                error: new Error("An error occurred while updating the vendor"),
            };
        }
    }
    async deleteVendor(id) {
        try {
            const vendor = await vendorModel_1.Vendor.findByIdAndDelete(id);
            if (!vendor) {
                return { error: new errors_1.HttpNotFoundError("Vendor not found", []) };
            }
            return { data: vendor };
        }
        catch (error) {
            console.error(error);
            return {
                error: new Error("An error occurred while deleting the vendor"),
            };
        }
    }
}
exports.default = VendorService;
