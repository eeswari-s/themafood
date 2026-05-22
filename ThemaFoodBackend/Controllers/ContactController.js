import ContactModel from "../Models/ContactModel.js";

import UserModel from "../Models/UserModel.js";

import SendMail from "../Utils/SendMail.js";

//================
// Create Contact
//================

export const CreateContact =
  async (request, response) => {
    try {
      const {
        FullName,
        Email,
        PhoneNumber,
        Subject,
        Message,
      } = request.body;

      //================
      // Validation
      //================

      if (!FullName) {
        return response.status(400).json({
          Success: false,
          Message:
            "FullName is required",
        });
      }

      if (!Email) {
        return response.status(400).json({
          Success: false,
          Message: "Email is required",
        });
      }

      if (!PhoneNumber) {
        return response.status(400).json({
          Success: false,
          Message:
            "PhoneNumber is required",
        });
      }

      if (!Message) {
        return response.status(400).json({
          Success: false,
          Message:
            "Message is required",
        });
      }

      //================
      // Create Contact
      //================

      const NewContact =
        await ContactModel.create({
          FullName,

          Email,

          PhoneNumber,

          Subject,

          Message,
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
      // Send Mail
      //================

      if (AdminUser) {
        await SendMail({
          To: AdminUser.Email,

          Subject:
            Subject ||
            "New Contact Message",

          Html: `
          
            <div
              style="
                font-family: Arial;
                padding: 20px;
              "
            >

              <h1>
                New Contact Message
              </h1>

              <p>
                <strong>
                  Full Name:
                </strong>

                ${FullName}
              </p>

              <p>
                <strong>
                  Email:
                </strong>

                ${Email}
              </p>

              <p>
                <strong>
                  Phone Number:
                </strong>

                ${PhoneNumber}
              </p>

              <p>
                <strong>
                  Subject:
                </strong>

                ${
                  Subject || "-"
                }
              </p>

              <p>
                <strong>
                  Message:
                </strong>

                ${Message}
              </p>

            </div>

          `,
        });
      }

      response.status(201).json({
        Success: true,

        Message:
          "Contact message sent successfully",

        Contact: NewContact,
      });
    } catch (error) {
      response.status(500).json({
        Success: false,

        Message: error.message,
      });
    }
  };

//================
// Get All Contacts
//================

export const GetAllContacts =
  async (request, response) => {
    try {
      const Contacts =
        await ContactModel.find({
          IsDeleted: false,
        }).sort({
          createdAt: -1,
        });

      response.status(200).json({
        Success: true,

        TotalContacts:
          Contacts.length,

        Contacts,
      });
    } catch (error) {
      response.status(500).json({
        Success: false,

        Message: error.message,
      });
    }
  };