import express from "express";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";
import { getBarCharts, getDashboardStats, getLineCharts, getPieCharts } from "../controller/stats.js";
const router = express.Router();

router.get("/stats", isAuthenticated, isAdmin, getDashboardStats);
router.get("/pie", isAuthenticated, isAdmin, getPieCharts);
router.get("/bar", isAuthenticated, isAdmin, getBarCharts);
router.get("/line", isAuthenticated, isAdmin, getLineCharts);

export default router;