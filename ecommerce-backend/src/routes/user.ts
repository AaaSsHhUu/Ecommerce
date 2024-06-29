import express from "express";
import { createUser, getAllUsers } from "../controller/user.js";

const router = express.Router();

router.post("/new", createUser);

// Admin routes
router.get("/user/all", getAllUsers);

export default router;