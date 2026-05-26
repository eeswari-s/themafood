import UserModel from "../Models/UserModel.js";

//================
// Get All Users
//================

export const GetAllUsers = async (
  request,
  response
) => {
  try {
    const Users =
      await UserModel.find({
        IsDeleted: false,
      })
        .select("-Password")
        .sort({
          createdAt: -1,
        });

    response.status(200).json({
      Success: true,
      TotalUsers: Users.length,
      Users,
    });
  } catch (error) {
    response.status(500).json({
      Success: false,
      Message: error.message,
    });
  }
};