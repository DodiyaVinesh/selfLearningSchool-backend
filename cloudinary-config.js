const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const CLOUD_NAME = "ddsq2cuhn";
const API_KEY = "381866444488145";
const API_SECRET = "Jho6SLvu3towyMO3DHb4EhHUVX0";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Upload",
    allowedFormats: ["png", "jpg", "jpeg"],
  },
});

module.exports = { storage, cloudinary };
