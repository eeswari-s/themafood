import CloudinaryUpload from "../Utils/CloudinaryUpload.js";

export const UploadTestImage = async (
  request,
  response
) => {
  try {
    if (
      !request.files ||
      request.files.length === 0
    ) {
      return response.status(400).json({
        success: false,
        message: "Image Not Found",
      });
    }

    const UploadedImages = [];

    for (const File of request.files) {
      const UploadImage =
        await CloudinaryUpload(
          File,
          "MarriageHall/Test"
        );

      UploadedImages.push({
        url: UploadImage.secure_url,

        public_id:
          UploadImage.public_id,
      });
    }

    response.status(200).json({
      success: true,
      message:
        "Images Uploaded Successfully",

      images: UploadedImages,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};