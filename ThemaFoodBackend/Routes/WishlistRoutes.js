import express from "express";

import AuthMiddleware from "../Middlewares/AuthMiddleware.js";

import {
  AddToWishlist,
  GetWishlist,
  RemoveWishlistProduct,
    MoveToCart,
} from "../Controllers/WishlistController.js";

const router = express.Router();

//================
// Add To Wishlist
//================

router.post(
  "/add-to-wishlist",

  AuthMiddleware,

  AddToWishlist
);

//================
// Get Wishlist
//================

router.get(
  "/get-wishlist",

  AuthMiddleware,

  GetWishlist
);

//================
// Remove Wishlist Product
//================

router.delete(
  "/remove-wishlist-product/:ProductID",

  AuthMiddleware,

  RemoveWishlistProduct
);


//================
// Move To Cart
//================

router.post(
  "/move-to-cart",

  AuthMiddleware,

  MoveToCart
);

export default router;