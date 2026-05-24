import OrderModel from "../Models/OrderModel.js";
import CartModel from "../Models/CartModel.js";
import UserModel from "../Models/UserModel.js";
import SendMail from "../Utils/SendMail.js";
import OrderMailTemplate from "../Templates/OrderMailTemplate.js";

//================
// Create Order
//================

export const CreateOrder = async (
  request,
  response
) => {
  try {
    const UserID = request.User._id;

    const {
      CustomerName,
      PhoneNumber,
      AlternatePhoneNumber,
      Address,
      Notes,
    } = request.body;

    //================
    // Validation
    //================

    if (!CustomerName) {
      return response.status(400).json({
        Success: false,
        Message:
          "CustomerName is required",
      });
    }

    if (!PhoneNumber) {
      return response.status(400).json({
        Success: false,
        Message:
          "PhoneNumber is required",
      });
    }

    if (!Address) {
      return response.status(400).json({
        Success: false,
        Message:
          "Address is required",
      });
    }

    //================
    // Get Cart
    //================

    const ExistingCart =
      await CartModel.findOne({
        UserID,
      }).populate(
        "CartItems.ProductID"
      );

    if (
      !ExistingCart ||
      ExistingCart.CartItems.length === 0
    ) {
      return response.status(400).json({
        Success: false,
        Message: "Cart is empty",
      });
    }

    //================
    // Ordered Products
    //================

    const OrderedProducts = [];

    let TotalItems = 0;

    let TotalAmount = 0;

    for (const Item of ExistingCart.CartItems) {
      const Product =
        Item.ProductID;

      if (!Product) continue;

      const Variant =
        Product.Variants.find(
          (Variant) =>
            Variant._id.toString() ===
            Item.VariantID.toString()
        );

      if (!Variant) continue;

      const ItemTotal =
        Variant.OfferPrice *
        Item.Quantity;

      OrderedProducts.push({
        ProductID: Product._id,
        ProductName:
          Product.ProductName,
        VariantID: Variant._id,
        Weight: Variant.Weight,
        Quantity: Item.Quantity,
        Price: Variant.OfferPrice,
        TotalPrice: ItemTotal,
        ProductImage:
          Variant.VariantImages?.[0]
            ?.ImageURL ||
          Product.ProductImages?.[0]
            ?.ImageURL ||
          "",
      });

      TotalItems += Item.Quantity;
      TotalAmount += ItemTotal;
    }

    //================
    // Create Order
    //================

    const NewOrder =
      await OrderModel.create({
        UserID,
        OrderedProducts,
        CustomerName,
        PhoneNumber,
        AlternatePhoneNumber,
        Address,
        Notes,
        TotalItems,
        TotalAmount,
      });

    //================
    // Find Admin
    //================

    const AdminUser =
      await UserModel.findOne({
        Role: "Admin",
        IsDeleted: false,
      });

    //================
    // Send Mail Only
    //================

    if (AdminUser) {
      await SendMail({
        To: AdminUser.Email,
        Subject:
          "New maFood Order",
        Html: OrderMailTemplate(
          NewOrder
        ),
      });
    }

    //================
    // Clear Cart
    //================

    ExistingCart.CartItems = [];

    await ExistingCart.save();

    response.status(201).json({
      Success: true,
      Message:
        "Order placed successfully",
      Order: NewOrder,
    });
  } catch (error) {
    response.status(500).json({
      Success: false,
      Message: error.message,
    });
  }
};

//================
// Get User Orders
//================

export const GetUserOrders = async (
  request,
  response
) => {
  try {
    const UserID = request.User._id;

    const Orders =
      await OrderModel.find({
        UserID,
        IsDeleted: false,
      }).sort({
        createdAt: -1,
      });

    response.status(200).json({
      Success: true,
      TotalOrders: Orders.length,
      Orders,
    });
  } catch (error) {
    response.status(500).json({
      Success: false,
      Message: error.message,
    });
  }
};

//================
// Get All Orders
//================

export const GetAllOrders = async (
  request,
  response
) => {
  try {
    const Orders =
      await OrderModel.find({
        IsDeleted: false,
      })
        .populate(
          "UserID",
          "FullName Email PhoneNumber"
        )
        .sort({
          createdAt: -1,
        });

    response.status(200).json({
      Success: true,
      TotalOrders: Orders.length,
      Orders,
    });
  } catch (error) {
    response.status(500).json({
      Success: false,
      Message: error.message,
    });
  }
};

//================
// Update Order Status
//================

export const UpdateOrderStatus =
  async (request, response) => {
    try {
      const { OrderID } =
        request.params;

      const { OrderStatus } =
        request.body;

      const ExistingOrder =
        await OrderModel.findOne({
          _id: OrderID,
          IsDeleted: false,
        });

      if (!ExistingOrder) {
        return response.status(404).json({
          Success: false,
          Message: "Order not found",
        });
      }

      ExistingOrder.OrderStatus =
        OrderStatus;

      await ExistingOrder.save();

      response.status(200).json({
        Success: true,
        Message:
          "Order status updated successfully",
      });
    } catch (error) {
      response.status(500).json({
        Success: false,
        Message: error.message,
      });
    }
  };