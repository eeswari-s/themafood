import SibApiV3Sdk from "sib-api-v3-sdk";

import fs from "fs";

//================
// Brevo Config
//================

const Client =
  SibApiV3Sdk.ApiClient.instance;

const ApiKey =
  Client.authentications[
    "api-key"
  ];

ApiKey.apiKey =
  process.env.BREVO_API_KEY;

//================
// Send Mail
//================

const SendMail = async ({
  To,
  Subject,
  Html,
  AttachmentPath,
}) => {
  try {
    const ApiInstance =
      new SibApiV3Sdk.TransactionalEmailsApi();

    //================
    // Email Data
    //================

    const EmailData = {
      sender: {
        email:
          process.env.BREVO_SENDER_EMAIL,

        name: "ThemaFood",
      },

      to: [
        {
          email: To,
        },
      ],

      subject: Subject,

      htmlContent: Html,
    };

    //================
    // PDF Attachment
    //================

    if (AttachmentPath) {
      const Attachment =
        fs
          .readFileSync(
            AttachmentPath
          )
          .toString("base64");

      EmailData.attachment = [
        {
          content: Attachment,

          name: "OrderInvoice.pdf",
        },
      ];
    }

    //================
    // Send Mail
    //================

    await ApiInstance.sendTransacEmail(
      EmailData
    );

    console.log(
      "Mail Sent Successfully"
    );
  } catch (error) {
    console.log(
      "Mail Error :",
      error.response?.body ||
        error.message
    );

    throw new Error(
      error.message
    );
  }
};

export default SendMail;