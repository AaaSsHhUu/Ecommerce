import express from "express";
import { createUser, loginUser } from "../controller/user.js";
// import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", createUser);
router.post("/login", loginUser);

export default router;