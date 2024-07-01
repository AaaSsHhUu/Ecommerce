import { Router } from "express";
import {getAllUsers, getUser} from "../controller/admin.js";

const router = Router();

// Admin routes
router.get("/users",getAllUsers);
router.get("/user/:id", getUser);

export default router;