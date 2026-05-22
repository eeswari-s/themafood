import multer from "multer";

const Storage = multer.memoryStorage();

const Multer = multer({
  storage: Storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export default Multer;