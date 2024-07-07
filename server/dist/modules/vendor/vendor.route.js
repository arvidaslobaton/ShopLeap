"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vendor_controller_1 = __importDefault(require("./vendor.controller"));
const vendor = (0, express_1.Router)();
const controller = new vendor_controller_1.default();
// Create new vendor
vendor.route("/").post(controller.createVendor);
// Get all vendors
vendor.route("/all-vendors").get(controller.getVendors);
// Get vendor by slug
vendor.route("/:slug").get(controller.getVendorBySlug);
// Update vendor
vendor.route("/:id").put(controller.updateVendor);
// Delete vendor
vendor.route("/:id").delete(controller.deleteVendor);
exports.default = vendor;
