import express from "express";

import AuthMiddleware from "../Middlewares/AuthMiddleware.js";

import RoleMiddleware from "../Middlewares/RoleMiddleware.js";

import {
  CreateContact,
  GetAllContacts,
} from "../Controllers/ContactController.js";

const router = express.Router();

//================
// Create Contact
//================

router.post(
  "/create-contact",

  CreateContact
);

//================
// Get All Contacts
//================

router.get(
  "/get-all-contacts",

  AuthMiddleware,

  RoleMiddleware("Admin"),

  GetAllContacts
);

export default router;