import express from "express";

import AuthMiddleware from "../Middlewares/AuthMiddleware.js";
import RoleMiddleware from "../Middlewares/RoleMiddleware.js";

import {
  GetAllUsers,
} from "../Controllers/UserController.js";

const router = express.Router();

//================
// Get All Users
//================

router.get(
  "/get-all-users",

  
  GetAllUsers
);

export default router;