import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI environment variable is not set. Please set MONGO_URI in your .env file.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb Connected at", conn.connection.host);
    console.log("Database Name : ", conn.connection.name);
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
