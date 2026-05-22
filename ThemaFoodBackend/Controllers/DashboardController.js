import UserModel from "../Models/UserModel.js";

import ProductModel from "../Models/ProductModel.js";

import OrderModel from "../Models/OrderModel.js";

//================
// Admin Dashboard
//================

export const AdminDashboard =
  async (request, response) => {
    try {
      //================
      // Total Users
      //================

      const TotalUsers =
        await UserModel.countDocuments({
          IsDeleted: false,
        });

      //================
      // Total Products
      //================

      const TotalProducts =
        await ProductModel.countDocuments({
          IsDeleted: false,
        });

      //================
      // Total Orders
      //================

      const TotalOrders =
        await OrderModel.countDocuments({
          IsDeleted: false,
        });

      //================
      // Pending Orders
      //================

      const PendingOrders =
        await OrderModel.countDocuments({
          OrderStatus: "Pending",

          IsDeleted: false,
        });

      //================
      // Confirmed Orders
      //================

      const ConfirmedOrders =
        await OrderModel.countDocuments({
          OrderStatus: "Confirmed",

          IsDeleted: false,
        });

      //================
      // Delivered Orders
      //================

      const DeliveredOrders =
        await OrderModel.countDocuments({
          OrderStatus: "Delivered",

          IsDeleted: false,
        });

      //================
      // Cancelled Orders
      //================

      const CancelledOrders =
        await OrderModel.countDocuments({
          OrderStatus: "Cancelled",

          IsDeleted: false,
        });

      //================
      // Total Revenue
      //================

      const RevenueOrders =
        await OrderModel.find({
          OrderStatus: {
            $ne: "Cancelled",
          },

          IsDeleted: false,
        });

      let TotalRevenue = 0;

      for (const Order of RevenueOrders) {
        TotalRevenue +=
          Order.TotalAmount;
      }

      //================
      // Latest Orders
      //================

      const LatestOrders =
        await OrderModel.find({
          IsDeleted: false,
        })
          .sort({
            createdAt: -1,
          })
          .limit(5);

      response.status(200).json({
        Success: true,

        DashboardData: {
          TotalUsers,

          TotalProducts,

          TotalOrders,

          PendingOrders,

          ConfirmedOrders,

          DeliveredOrders,

          CancelledOrders,

          TotalRevenue,

          LatestOrders,
        },
      });
    } catch (error) {
      response.status(500).json({
        Success: false,
        Message: error.message,
      });
    }
  };