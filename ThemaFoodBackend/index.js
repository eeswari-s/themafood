import express from "express";
import cors from "cors";

import "./Config/Env.js";
import Database from "./Config/Database.js";

import AuthRoutes from "./Routes/AuthRoutes.js";
import TestRoutes from "./Routes/TestRoutes.js";
import UploadRoutes from "./Routes/UploadRoutes.js";
import ProductRoutes from "./Routes/ProductRoutes.js";
import WishlistRoutes from "./Routes/WishlistRoutes.js";
import CartRoutes from "./Routes/CartRoutes.js";
import OrderRoutes from "./Routes/OrderRoutes.js";
import DashboardRoutes from "./Routes/DashboardRoutes.js";
import ContactRoutes from "./Routes/ContactRoutes.js";


const app = express();

app.use(cors());

app.use(express.json());

Database();

//================
// Routes
//================

app.use("/api/auth", AuthRoutes);
app.use("/api/test", TestRoutes);
app.use("/api/upload", UploadRoutes);
app.use("/api/product", ProductRoutes);
app.use("/api/wishlist", WishlistRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/order", OrderRoutes);
app.use("/api/dashboard", DashboardRoutes);
app.use("/api/contact", ContactRoutes);






app.get("/", (request, response) => {
  response.status(200).json({
    Message: "Thema Food Backend Running Successfully",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});