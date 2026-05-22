import express from "express";

import AuthMiddleware from "../Middlewares/AuthMiddleware.js";

import RoleMiddleware from "../Middlewares/RoleMiddleware.js";

import { AdminDashboard } from "../Controllers/DashboardController.js";

const router = express.Router();

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