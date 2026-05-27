import express from "express";

import AuthMiddleware from "../Middlewares/AuthMiddleware.js";
import RoleMiddleware from "../Middlewares/RoleMiddleware.js";

import {
  CreateProduct,
  GetAllProducts,
  GetSingleProduct,
  UpdateProduct,
  DeleteProduct,
} from "../Controllers/ProductController.js";

const router = express.Router();

//================
// Create Product
//================

router.post(
  "/create-product",



  CreateProduct
);

//================
// Get All Products
//================

router.get(
  "/get-all-products",

  GetAllProducts
);

//================
// Get Single Product
//================

router.get(
  "/get-single-product/:ProductID",

  GetSingleProduct
);

//================
// Update Product
//================

router.put(
  "/update-product/:ProductID",

  AuthMiddleware,

  RoleMiddleware("Admin"),

  UpdateProduct
);

//================
// Delete Product
//================

router.delete(
  "/delete-product/:ProductID",

  AuthMiddleware,

  RoleMiddleware("Admin"),

  DeleteProduct
);

export default router;