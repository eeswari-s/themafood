import mongoose from "mongoose";

//================
// Ordered Product Schema
//================

const OrderedProductSchema =
  new mongoose.Schema(
    {
      ProductID: {
        type: mongoose.Schema.Types.ObjectId,

        ref: "Product",

        required: true,
      },

      ProductName: {
        type: String,

        required: true,
      },

      VariantID: {
        type: mongoose.Schema.Types.ObjectId,

        required: true,
      },

      Weight: {
        type: String,

        required: true,
      },

      Quantity: {
        type: Number,

        required: true,
      },

      Price: {
        type: Number,

        required: true,
      },

      TotalPrice: {
        type: Number,

        required: true,
      },

      ProductImage: {
        type: String,

        required: true,
      },
    },
    {
      _id: false,
    }
  );

//================
// Order Schema
//================

const OrderSchema =
  new mongoose.Schema(
    {
      UserID: {
        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      OrderedProducts: [
        OrderedProductSchema,
      ],

      CustomerName: {
        type: String,

        required: true,

        trim: true,
      },

      PhoneNumber: {
        type: String,

        required: true,

        trim: true,
      },

      AlternatePhoneNumber: {
        type: String,

        trim: true,
      },

      Address: {
        type: String,

        required: true,

        trim: true,
      },

      Notes: {
        type: String,

        trim: true,
      },

      TotalItems: {
        type: Number,

        required: true,
      },

      TotalAmount: {
        type: Number,

        required: true,
      },

      OrderStatus: {
        type: String,

        enum: [
          "Pending",
          "Confirmed",
          "Preparing",
          "Out For Delivery",
          "Delivered",
          "Cancelled",
        ],

        default: "Pending",
      },

      IsDeleted: {
        type: Boolean,

        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

const OrderModel = mongoose.model(
  "Order",
  OrderSchema
);

export default OrderModel;