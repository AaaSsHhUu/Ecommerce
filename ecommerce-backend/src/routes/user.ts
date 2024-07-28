import express from "express";
import { createUser, getAllUsers, getUser, deleteUser, updateUserProfile } from "../controller/user.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", createUser);

router.get("/all",isAuthenticated, isAdmin ,getAllUsers);
router.route("/:id").get(getUser).delete(isAuthenticated, isAdmin, deleteUser).put(isAuthenticated, isAdmin, updateUserProfile);

export default router;