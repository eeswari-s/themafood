import mongoose from "mongoose";

//================
// Wishlist Item Schema
//================

const WishlistItemSchema =
  new mongoose.Schema(
    {
      ProductID: {
        type: mongoose.Schema.Types.ObjectId,

        ref: "Product",

        required: true,
      },

      AddedAt: {
        type: Date,

        default: Date.now,
      },
    },
    {
      _id: false,
    }
  );

//================
// Wishlist Schema
//================

const WishlistSchema =
  new mongoose.Schema(
    {
      UserID: {
        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

        unique: true,
      },

      WishlistItems: [
        WishlistItemSchema,
      ],
    },
    {
      timestamps: true,
    }
  );

const WishlistModel = mongoose.model(
  "Wishlist",
  WishlistSchema
);

export default WishlistModel;