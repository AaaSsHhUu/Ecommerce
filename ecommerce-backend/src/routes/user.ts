import express from "express";
import { createUser, getAllUsers, loginUser, getUser, deleteUser, updateUserProfile } from "../controller/user.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);

router.get("/all",isAuthenticated, isAdmin ,getAllUsers);
router.route("/:id").get(isAdmin, getUser).delete(isAdmin, deleteUser).put(isAdmin, updateUserProfile);

export default router;