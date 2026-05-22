import express from "express";

import AuthMiddleware from "../Middlewares/AuthMiddleware.js";

import RoleMiddleware from "../Middlewares/RoleMiddleware.js";

import {
  CreateOrder,
  GetUserOrders,
  GetAllOrders,
  UpdateOrderStatus,
} from "../Controllers/OrderController.js";

const router = express.Router();

//================
// Create Order
//================

router.post(
  "/create-order",

  AuthMiddleware,

  CreateOrder
);

//================
// Get User Orders
//================

router.get(
  "/get-user-orders",

  AuthMiddleware,

  GetUserOrders
);

//================
// Get All Orders
//================

router.get(
  "/get-all-orders",

  AuthMiddleware,

  RoleMiddleware("Admin"),

  GetAllOrders
);

//================
// Update Order Status
//================

router.put(
  "/update-order-status/:OrderID",

  AuthMiddleware,

  RoleMiddleware("Admin"),

  UpdateOrderStatus
);

export default router;