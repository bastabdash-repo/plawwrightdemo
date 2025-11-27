import express, { Request, Response } from "express";
import userRoutes from "./users"; // ✅ Ensure correct path
import { connectDB } from "./database"; // ✅ Import DB connection

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("👋 Welcome! The server is up and running.");
});

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.send("✅ Server is healthy and running!");
});

// Mount the user routes under /api
app.use("/api", userRoutes);

// Start the server only after DB connection
const PORT = 3000;

const startServer = async () => {
  await connectDB(); // ✅ Connect to MongoDB Atlas first

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📌 Health check: http://localhost:${PORT}/health`);
    console.log(`📌 API base: http://localhost:${PORT}/api`);
  });
};

startServer();
