import streamifier from "streamifier";

import cloudinary from "../Config/Cloudinary.js";

//================
// Cloudinary Upload
//================

const CloudinaryUpload = async (
  file,
  folder = "ThemaFood"
) => {
  return new Promise(
    (resolve, reject) => {
      const Stream =
        cloudinary.uploader.upload_stream(
          {
            folder,

            resource_type: "image",

            quality: "auto:good",

            fetch_format: "auto",

            transformation: [
              {
                width: 1920,
                crop: "limit",
              },
            ],
          },

          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

      streamifier
        .createReadStream(file.buffer)
        .pipe(Stream);
    }
  );
};

export default CloudinaryUpload;