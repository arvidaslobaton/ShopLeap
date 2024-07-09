import { Router } from "express";
import multer from "multer";
import { deleteFile, uploadFile } from "./updload.controller";

const uploadRouter: Router = Router();

const upload = multer({ dest: "uploads/" });

uploadRouter.route("/upload-file").post(upload.single("file"), uploadFile);
uploadRouter.route("/delete-file/:fileName").delete(deleteFile);

export default uploadRouter;
