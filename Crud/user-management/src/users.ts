import { Router, Request, Response } from "express";

const router = Router();

interface User {
  id: number;
  name: string;
  email: string;
}

let users: User[] = []; // In-memory "database"

// CREATE
router.post("/user", (req: Request, res: Response) => {
  const newUser: User = { id: Date.now(), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);

  console.log("🟢 POST /user - New user created:");
  console.log(newUser); // actual values
});

// READ ALL
router.get("/", (req: Request, res: Response) => {
  res.json(users);

  console.log("📄 GET / - All users:");
  console.log(users); // actual values
});

// READ ONE
router.get("/:id", (req: Request, res: Response) => {
  const user = users.find(u => u.id === Number(req.params.id));
  user ? res.json(user) : res.status(404).json({ message: "User not found" });

  console.log(`🔍 GET /${req.params.id} - User:`);
  console.log(user || "User not found"); // actual values
});

// UPDATE
router.put("/:id", (req: Request, res: Response) => {
  const index = users.findIndex(u => u.id === Number(req.params.id));
  if (index >= 0) {
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);

    console.log(`✏️ PUT /${req.params.id} - User updated:`);
    console.log(users[index]); // actual updated values
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// DELETE
router.delete("/:id", (req: Request, res: Response) => {
  const deletedUser = users.find(u => u.id === Number(req.params.id));
  users = users.filter(u => u.id !== Number(req.params.id));
  res.json({ message: "User deleted" });

  console.log(`🗑 DELETE /${req.params.id} - Deleted user:`);
  console.log(deletedUser || "User not found"); // actual deleted values
});

export default router;

