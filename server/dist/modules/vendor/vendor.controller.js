"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vendor_service_1 = __importDefault(require("./vendor.service"));
const api_1 = __importDefault(require("../../lib/api"));
const axios_1 = require("axios");
class VendorController extends api_1.default {
    vendorService = new vendor_service_1.default();
    // @desc Create a new Vendor
    // @router /api/vendor
    // @access Private
    createVendor = async (req, res, next) => {
        try {
            const newVendor = await this.vendorService.createVendor(req.body);
            if (!newVendor) {
                this.send(res, newVendor, axios_1.HttpStatusCode.BadRequest, "Must provide valid data");
            }
            this.send(res, newVendor, axios_1.HttpStatusCode.Created, "Vendor Created");
        }
        catch (error) {
            console.log(error);
        }
    };
    // @desc Get Vendors
    // @router /api/vendor/all-vendors
    // @access Public
    getVendors = async (req, res, next) => {
        try {
            const vendors = await this.vendorService.getVendors();
            this.send(res, vendors, axios_1.HttpStatusCode.Created, "All Vendors");
        }
        catch (error) {
            console.log(error);
        }
    };
    // @desc Get Vendors
    // @router /api/vendor/vendors
    // @access Public
    getVendorBySlug = async (req, res, next) => {
        try {
            const vendorBySlug = await this.vendorService.getVendorBySlug(req.params.slug);
            const statusCode = vendorBySlug?.error
                ? axios_1.HttpStatusCode.NotFound
                : axios_1.HttpStatusCode.Ok;
            this.send(res, vendorBySlug, statusCode, "Get Vendor By Slug");
        }
        catch (error) {
            console.error(error);
            next(error); // pass the error to the error handling middleware
        }
    };
    // @desc Update Vendor
    // @router /api/vendor/:id
    // @access Private
    updateVendor = async (req, res, next) => {
        try {
            const updatedVendor = await this.vendorService.updateVendor(req.params.id, req.body);
            const statusCode = updatedVendor?.error
                ? axios_1.HttpStatusCode.NotFound
                : axios_1.HttpStatusCode.Ok;
            this.send(res, updatedVendor, statusCode, "Update Vendor");
        }
        catch (error) {
            console.error(error);
            next(error); // pass the error to the error handling middleware
        }
    };
    // @desc Delete Vendor
    // @router /api/vendor/:id
    // @access Private
    deleteVendor = async (req, res, next) => {
        try {
            const vendor = await this.vendorService.deleteVendor(req.params.id);
            const statusCode = vendor?.error
                ? axios_1.HttpStatusCode.NotFound
                : axios_1.HttpStatusCode.Ok;
            this.send(res, vendor, statusCode, "Delete Vendor");
        }
        catch (error) {
            console.error(error);
            next(error); // pass the error to the error handling middleware
        }
    };
}
exports.default = VendorController;
