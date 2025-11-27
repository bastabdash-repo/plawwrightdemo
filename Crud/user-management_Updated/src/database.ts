import mongoose from "mongoose";

  const MONGO_URI =
  "mongodb+srv://bastab_dash:Kunu1234%21@cluster0.alozmz9.mongodb.net/userDB?retryWrites=true&w=majority&appName=Cluster0";

// 👆 userDB = database name (you can change it if you want)

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected...");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
