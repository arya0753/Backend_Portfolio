import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const URI = process.env.BASE_URL;

export const connectionDB = async () => {
  try {
    if (!URI) {
      throw new Error("MongoDB connection string (BASE_URL) is undefined.");
    }
    await mongoose.connect(URI);
    console.log("✅ Mongo Connected...");
  } catch (err) {
    console.error("❌ Mongo Not Connected Properly:", err.message);
  }
};
