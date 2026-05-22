import mongoose from "mongoose";

const Database = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("Database Connection Error:", error.message);
    process.exit(1);
  }
};

export default Database;