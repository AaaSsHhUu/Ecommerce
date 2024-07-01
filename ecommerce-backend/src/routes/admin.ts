import { Router } from "express";
import {deleteUser, getAllUsers, getUser} from "../controller/admin.js";
import { isAuthenticated, isAuthorized } from "../middleware/auth.js";

const router = Router();

// Admin routes
router.get("/users",isAuthenticated, isAuthorized("admin"),getAllUsers);
router.get("/user/:id",isAuthenticated, isAuthorized("admin"), getUser);
router.delete("/user/:id",isAuthenticated,isAuthorized("admin"), deleteUser);


export default router;