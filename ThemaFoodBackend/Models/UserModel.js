import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    FullName: {
      type: String,
      required: true,
      trim: true,
    },

    Email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    PhoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    Password: {
      type: String,
      required: true,
    },

    Role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },

    IsBlocked: {
      type: Boolean,
      default: false,
    },

    IsDeleted: {
      type: Boolean,
      default: false,
    },

    LastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;