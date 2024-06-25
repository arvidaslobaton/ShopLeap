import { Router } from "express";
import Controller from "./vendor.controller";
import { protect } from "../../middleware/authMiddleware";

const vendor: Router = Router();
const controller = new Controller();

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

export default vendor;
