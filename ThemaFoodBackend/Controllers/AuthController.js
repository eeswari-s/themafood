import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../Models/UserModel.js";

//================
// Register
//================

export const Register = async (request, response) => {
  try {
    const {
      FullName,
      Email,
      PhoneNumber,
      Password,
      Role,
    } = request.body;

    if (
      !FullName ||
      !Email ||
      !PhoneNumber ||
      !Password
    ) {
      return response.status(400).json({
        Success: false,
        Message: "All fields are required",
      });
    }

    const ExistingUser = await UserModel.findOne({
      Email: Email.toLowerCase(),
      IsDeleted: false,
    });

    if (ExistingUser) {
      return response.status(400).json({
        Success: false,
        Message: "User already exists",
      });
    }

    const HashedPassword = await bcrypt.hash(
      Password,
      10
    );

    const NewUser = await UserModel.create({
      FullName,
      Email: Email.toLowerCase(),
      PhoneNumber,
      Password: HashedPassword,
      Role: Role || "User",
    });

    const Token = jwt.sign(
      {
        UserID: NewUser._id,
        Role: NewUser.Role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    response.status(201).json({
      Success: true,
      Message:
        NewUser.Role === "Admin"
          ? "Admin registered successfully"
          : "User registered successfully",

      Token,

      User: {
        _id: NewUser._id,
        FullName: NewUser.FullName,
        Email: NewUser.Email,
        PhoneNumber: NewUser.PhoneNumber,
        Role: NewUser.Role,
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
// Login
//================

export const Login = async (request, response) => {
  try {
    const { Email, Password } = request.body;

    if (!Email || !Password) {
      return response.status(400).json({
        Success: false,
        Message: "Email and Password are required",
      });
    }

    const ExistingUser = await UserModel.findOne({
      Email: Email.toLowerCase(),
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

    const IsPasswordMatched = await bcrypt.compare(
      Password,
      ExistingUser.Password
    );

    if (!IsPasswordMatched) {
      return response.status(400).json({
        Success: false,
        Message: "Invalid password",
      });
    }

    ExistingUser.LastLogin = new Date();

    await ExistingUser.save();

    const Token = jwt.sign(
      {
        UserID: ExistingUser._id,
        Role: ExistingUser.Role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    response.status(200).json({
      Success: true,
      Message:
        ExistingUser.Role === "Admin"
          ? "Admin login successful"
          : "User login successful",

      Token,

      User: {
        _id: ExistingUser._id,
        FullName: ExistingUser.FullName,
        Email: ExistingUser.Email,
        PhoneNumber: ExistingUser.PhoneNumber,
        Role: ExistingUser.Role,
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
// Logout
//================

export const Logout = async (request, response) => {
  try {
    response.status(200).json({
      Success: true,
      Message: "Logout successful",
    });
  } catch (error) {
    response.status(500).json({
      Success: false,
      Message: error.message,
    });
  }
};