import express from "express";

import AuthMiddleware from "../Middlewares/AuthMiddleware.js";

import {
  AddToCart,
  GetCart,
  UpdateCartQuantity,
  RemoveCartItem,
} from "../Controllers/CartController.js";

const router = express.Router();

//================
// Add To Cart
//================

router.post(
  "/add-to-cart",

  AuthMiddleware,

  AddToCart
);

//================
// Get Cart
//================

router.get(
  "/get-cart",

  AuthMiddleware,

  GetCart
);

//================
// Update Cart Quantity
//================

router.put(
  "/update-cart-quantity",

  AuthMiddleware,

  UpdateCartQuantity
);

//================
// Remove Cart Item
//================

router.delete(
  "/remove-cart-item/:CartItemID",

  AuthMiddleware,

  RemoveCartItem
);

export default router;