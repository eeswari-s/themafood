import express from "express";

import AuthMiddleware from "../Middlewares/AuthMiddleware.js";
import RoleMiddleware from "../Middlewares/RoleMiddleware.js";

import {
  UserDashboard,
  AdminDashboard,
} from "../Controllers/TestController.js";

const router = express.Router();

//================
// User Dashboard
//================

router.get(
  "/user-dashboard",
  AuthMiddleware,
  UserDashboard
);

//================
// Admin Dashboard
//================

router.get(
  "/admin-dashboard",
  AuthMiddleware,
  RoleMiddleware("Admin"),
  AdminDashboard
);

export default router;