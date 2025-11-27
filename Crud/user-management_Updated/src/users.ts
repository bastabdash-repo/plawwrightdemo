import { Router, Request, Response } from "express";
import mongoose, { Schema, Document } from "mongoose";

const router = Router();

// 1. Define User interface for TypeScript
interface IUser extends Document {
  name: string;
  email: string;
}

// 2. Create Mongoose Schema
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// 3. Create Mongoose Model
const User = mongoose.model<IUser>("User", UserSchema);

// ---------------- CRUD Routes ---------------- //

// CREATE
router.post("/user", async (req: Request, res: Response) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser);
    console.log("🟢 POST /user - New user created:", newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// READ ALL
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
    console.log("📄 GET / - All users:", users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// READ ONE
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
      console.log(`🔍 GET /${req.params.id} - User:`, user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

// UPDATE
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (updatedUser) {
      res.json(updatedUser);
      console.log(`✏️ PUT /${req.params.id} - User updated:`, updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

// DELETE
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (deletedUser) {
      res.json({ message: "User deleted", deletedUser });
      console.log(`🗑 DELETE /${req.params.id} - Deleted user:`, deletedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

export default router;
