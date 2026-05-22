import CartModel from "../Models/CartModel.js";

import ProductModel from "../Models/ProductModel.js";

//================
// Add To Cart
//================

export const AddToCart = async (
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

    const ExistingVariant =
      ExistingProduct.Variants.find(
        (Variant) =>
          Variant._id.toString() ===
          VariantID
      );

    if (!ExistingVariant) {
      return response.status(404).json({
        Success: false,
        Message: "Variant not found",
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

    await ExistingCart.save();

    response.status(200).json({
      Success: true,
      Message:
        "Product added to cart",
    });
  } catch (error) {
    response.status(500).json({
      Success: false,
      Message: error.message,
    });
  }
};

//================
// Get Cart
//================

export const GetCart = async (
  request,
  response
) => {
  try {
    const UserID = request.User._id;

    const Cart =
      await CartModel.findOne({
        UserID,
      }).populate(
        "CartItems.ProductID"
      );

    if (!Cart) {
      return response.status(200).json({
        Success: true,

        TotalItems: 0,

        TotalAmount: 0,

        Cart: {
          UserID,

          CartItems: [],
        },
      });
    }

    let TotalAmount = 0;

    let TotalItems = 0;

    for (const Item of Cart.CartItems) {
      const Product =
        Item.ProductID;

      if (!Product) {
        continue;
      }

      const Variant =
        Product.Variants.find(
          (Variant) =>
            Variant._id.toString() ===
            Item.VariantID.toString()
        );

      if (!Variant) {
        continue;
      }

      const ItemPrice =
        Variant.OfferPrice;

      const ItemTotal =
        ItemPrice * Item.Quantity;

      TotalAmount += ItemTotal;

      TotalItems += Item.Quantity;
    }

    response.status(200).json({
      Success: true,

      TotalItems,

      TotalAmount,

      Cart,
    });
  } catch (error) {
    response.status(500).json({
      Success: false,
      Message: error.message,
    });
  }
};

//================
// Update Cart Quantity
//================

export const UpdateCartQuantity =
  async (request, response) => {
    try {
      const UserID =
        request.User._id;

      const {
        CartItemID,
        Quantity,
      } = request.body;

      if (
        !CartItemID ||
        !Quantity
      ) {
        return response.status(400).json({
          Success: false,
          Message:
            "CartItemID and Quantity are required",
        });
      }

      const ExistingCart =
        await CartModel.findOne({
          UserID,
        });

      if (!ExistingCart) {
        return response.status(404).json({
          Success: false,
          Message: "Cart not found",
        });
      }

      const ExistingCartItem =
        ExistingCart.CartItems.id(
          CartItemID
        );

      if (!ExistingCartItem) {
        return response.status(404).json({
          Success: false,
          Message:
            "Cart item not found",
        });
      }

      ExistingCartItem.Quantity =
        Quantity;

      await ExistingCart.save();

      response.status(200).json({
        Success: true,
        Message:
          "Cart quantity updated",
      });
    } catch (error) {
      response.status(500).json({
        Success: false,
        Message: error.message,
      });
    }
  };

//================
// Remove Cart Item
//================

export const RemoveCartItem =
  async (request, response) => {
    try {
      const UserID =
        request.User._id;

      const { CartItemID } =
        request.params;

      const ExistingCart =
        await CartModel.findOne({
          UserID,
        });

      if (!ExistingCart) {
        return response.status(404).json({
          Success: false,
          Message: "Cart not found",
        });
      }

      ExistingCart.CartItems =
        ExistingCart.CartItems.filter(
          (Item) =>
            Item._id.toString() !==
            CartItemID
        );

      await ExistingCart.save();

      response.status(200).json({
        Success: true,
        Message:
          "Cart item removed successfully",
      });
    } catch (error) {
      response.status(500).json({
        Success: false,
        Message: error.message,
      });
    }
  };