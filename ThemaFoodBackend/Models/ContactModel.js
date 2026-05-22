import mongoose from "mongoose";

//================
// Contact Schema
//================

const ContactSchema =
  new mongoose.Schema(
    {
      FullName: {
        type: String,

        required: true,

        trim: true,
      },

      Email: {
        type: String,

        required: true,

        trim: true,

        lowercase: true,
      },

      PhoneNumber: {
        type: String,

        required: true,

        trim: true,
      },

      Subject: {
        type: String,

        trim: true,
      },

      Message: {
        type: String,

        required: true,

        trim: true,
      },

      IsDeleted: {
        type: Boolean,

        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

const ContactModel =
  mongoose.model(
    "Contact",
    ContactSchema
  );

export default ContactModel;