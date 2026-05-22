import mongoose from "mongoose";

//================
// Cart Item Schema
//================

const CartItemSchema =
  new mongoose.Schema(
    {
      ProductID: {
        type: mongoose.Schema.Types.ObjectId,

        ref: "Product",

        required: true,
      },

      VariantID: {
        type: mongoose.Schema.Types.ObjectId,

        required: true,
      },

      Quantity: {
        type: Number,

        required: true,

        default: 1,
      },

      AddedAt: {
        type: Date,

        default: Date.now,
      },
    },
    {
      _id: true,
    }
  );

//================
// Cart Schema
//================

const CartSchema =
  new mongoose.Schema(
    {
      UserID: {
        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

        unique: true,
      },

      CartItems: [CartItemSchema],
    },
    {
      timestamps: true,
    }
  );

const CartModel = mongoose.model(
  "Cart",
  CartSchema
);

export default CartModel;