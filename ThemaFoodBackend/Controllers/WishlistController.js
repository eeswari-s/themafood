import WishlistModel from "../Models/WishlistModel.js";

import ProductModel from "../Models/ProductModel.js";

import CartModel from "../Models/CartModel.js";

//================
// Add To Wishlist
//================

export const AddToWishlist = async (
  request,
  response
) => {
  try {
    const UserID = request.User._id;

    const { ProductID } = request.body;

    if (!ProductID) {
      return response.status(400).json({
        Success: false,
        Message: "ProductID is required",
      });
    }

    const ExistingProduct =
      await ProductModel.findOne({
        _id: ProductID,

        IsDeleted: false,
      });

    if (!ExistingProduct) {
      return response.status(404).json({
        Success: false,
        Message: "Product not found",
      });
    }

    let ExistingWishlist =
      await WishlistModel.findOne({
        UserID,
      });

    if (!ExistingWishlist) {
      ExistingWishlist =
        await WishlistModel.create({
          UserID,

          WishlistItems: [],
        });
    }

    const AlreadyExists =
      ExistingWishlist.WishlistItems.find(
        (Item) =>
          Item.ProductID.toString() ===
          ProductID
      );

    if (AlreadyExists) {
      return response.status(400).json({
        Success: false,
        Message:
          "Product already in wishlist",
      });
    }

    ExistingWishlist.WishlistItems.push({
      ProductID,
    });

    await ExistingWishlist.save();

    response.status(200).json({
      Success: true,
      Message:
        "Product added to wishlist",
    });
  } catch (error) {
    response.status(500).json({
      Success: false,
      Message: error.message,
    });
  }
};

//================
// Get Wishlist
//================

export const GetWishlist = async (
  request,
  response
) => {
  try {
    const UserID = request.User._id;

    const Wishlist =
      await WishlistModel.findOne({
        UserID,
      }).populate(
        "WishlistItems.ProductID"
      );

    response.status(200).json({
      Success: true,

      Wishlist:
        Wishlist || {
          UserID,

          WishlistItems: [],
        },
    });
  } catch (error) {
    response.status(500).json({
      Success: false,
      Message: error.message,
    });
  }
};

//================
// Remove Wishlist Product
//================

export const RemoveWishlistProduct =
  async (request, response) => {
    try {
      const UserID =
        request.User._id;

      const { ProductID } =
        request.params;

      const ExistingWishlist =
        await WishlistModel.findOne({
          UserID,
        });

      if (!ExistingWishlist) {
        return response.status(404).json({
          Success: false,
          Message: "Wishlist not found",
        });
      }

      ExistingWishlist.WishlistItems =
        ExistingWishlist.WishlistItems.filter(
          (Item) =>
            Item.ProductID.toString() !==
            ProductID
        );

      await ExistingWishlist.save();

      response.status(200).json({
        Success: true,
        Message:
          "Product removed from wishlist",
      });
    } catch (error) {
      response.status(500).json({
        Success: false,
        Message: error.message,
      });
    }
  };

//================
// Move To Cart
//================

export const MoveToCart = async (
  request,
  response
) => {
  try {
    const UserID = request.User._id;

    const {
      ProductID,
      VariantID,
      Quantity,
    } = request.body;

    if (
      !ProductID ||
      !VariantID
    ) {
      return response.status(400).json({
        Success: false,
        Message:
          "ProductID and VariantID are required",
      });
    }

    const ExistingWishlist =
      await WishlistModel.findOne({
        UserID,
      });

    if (!ExistingWishlist) {
      return response.status(404).json({
        Success: false,
        Message: "Wishlist not found",
      });
    }

    const WishlistProduct =
      ExistingWishlist.WishlistItems.find(
        (Item) =>
          Item.ProductID.toString() ===
          ProductID
      );

    if (!WishlistProduct) {
      return response.status(404).json({
        Success: false,
        Message:
          "Product not found in wishlist",
      });
    }

    let ExistingCart =
      await CartModel.findOne({
        UserID,
      });

    if (!ExistingCart) {
      ExistingCart =
        await CartModel.create({
          UserID,

          CartItems: [],
        });
    }

    const ExistingCartItem =
      ExistingCart.CartItems.find(
        (Item) =>
          Item.ProductID.toString() ===
            ProductID &&
          Item.VariantID.toString() ===
            VariantID
      );

    if (ExistingCartItem) {
      ExistingCartItem.Quantity +=
        Quantity || 1;
    } else {
      ExistingCart.CartItems.push({
        ProductID,

        VariantID,

        Quantity: Quantity || 1,
      });
    }

    ExistingWishlist.WishlistItems =
      ExistingWishlist.WishlistItems.filter(
        (Item) =>
          Item.ProductID.toString() !==
          ProductID
      );

    await ExistingCart.save();

    await ExistingWishlist.save();

    response.status(200).json({
      Success: true,
      Message:
        "Product moved to cart successfully",
    });
  } catch (error) {
    response.status(500).json({
      Success: false,
      Message: error.message,
    });
  }
};