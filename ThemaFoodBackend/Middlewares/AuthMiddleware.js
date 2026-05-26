import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";

//================
// Auth Middleware
//================

const AuthMiddleware = async (
  request,
  response,
  next
) => {
  try {
    const Authorization =
      request.headers.authorization;

    console.log(
      "Authorization Header =>",
      Authorization
    );

    if (!Authorization) {
      return response.status(401).json({
        Success: false,
        Message: "Token not found",
      });
    }

    const Token =
      Authorization.split(" ")[1];

    console.log(
      "Token =>",
      Token
    );

    if (!Token) {
      return response.status(401).json({
        Success: false,
        Message: "Invalid token format",
      });
    }

    const DecodedToken =
      jwt.verify(
        Token,
        process.env.JWT_SECRET
      );

    console.log(
      "Decoded Token =>",
      DecodedToken
    );

    const UserId =
      DecodedToken.UserID ||
      DecodedToken.id;

    console.log(
      "User Id =>",
      UserId
    );

    // Debug All Users
    const AllUsers =
      await UserModel.find();

    console.log(
      "All Users =>",
      AllUsers.map((user) => ({
        _id: user._id.toString(),
        Email: user.Email,
        Role: user.Role,
        IsDeleted: user.IsDeleted,
      }))
    );

    const ExistingUser =
      await UserModel.findOne({
        _id: UserId,
        IsDeleted: false,
      });

    console.log(
      "Existing User =>",
      ExistingUser
    );

    if (!ExistingUser) {
      return response.status(404).json({
        Success: false,
        Message: "User not found",
      });
    }

    if (ExistingUser.IsBlocked) {
      return response.status(403).json({
        Success: false,
        Message:
          "User account is blocked",
      });
    }

    request.User = ExistingUser;

    next();
  } catch (error) {
    console.log(
      "Auth Middleware Error =>",
      error
    );

    response.status(401).json({
      Success: false,
      Message: "Unauthorized access",
      Error: error.message,
    });
  }
};

export default AuthMiddleware;