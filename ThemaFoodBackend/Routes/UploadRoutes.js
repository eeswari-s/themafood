import express from "express";

import Multer from "../Utils/Multer.js";

import { UploadTestImage } from "../Controllers/UploadController.js";

const Router = express.Router();

Router.post(
  "/upload-image",
 Multer.array("image", 20),
  UploadTestImage
);

export default Router;