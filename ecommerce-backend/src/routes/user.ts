import express from "express";
import { createUser, getAllUsers, getUser, deleteUser, updateUserProfile } from "../controller/user.js";
import { adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", createUser);

router.get("/all",adminOnly ,getAllUsers);
router.route("/:id").get(getUser).delete(adminOnly, deleteUser).put(adminOnly, updateUserProfile);

export default router;