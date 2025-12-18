import mongoose from "mongoose";

async function dbConnect() {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to database");
      return;
    }

    if (mongoose.connection.readyState === 2) {
      console.log("Connection in progress...");
      return;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI || '');
    
    console.log("DB connected successfully");
    
    return db;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error; 
  }
}

export default dbConnect;