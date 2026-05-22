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

    if (!Authorization) {
      return response.status(401).json({
        Success: false,
        Message: "Token not found",
      });
    }

    const Token = Authorization.split(" ")[1];

    if (!Token) {
      return response.status(401).json({
        Success: false,
        Message: "Invalid token format",
      });
    }

    const DecodedToken = jwt.verify(
      Token,
      process.env.JWT_SECRET
    );

    const ExistingUser = await UserModel.findOne({
      _id: DecodedToken.UserID,
      IsDeleted: false,
    });

    if (!ExistingUser) {
      return response.status(404).json({
        Success: false,
        Message: "User not found",
      });
    }

    if (ExistingUser.IsBlocked) {
      return response.status(403).json({
        Success: false,
        Message: "User account is blocked",
      });
    }

    request.User = ExistingUser;

    next();
  } catch (error) {
    response.status(401).json({
      Success: false,
      Message: "Unauthorized access",
    });
  }
};

export default AuthMiddleware;