import express from "express";

import {
  Register,
  Login,
  Logout,
} from "../Controllers/AuthController.js";

const router = express.Router();

//================
// Register
//================

router.post("/register", Register);

//================
// Login
//================

router.post("/login", Login);

//================
// Logout
//================

router.post("/logout", Logout);

export default router;