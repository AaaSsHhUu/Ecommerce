import express from "express";
import { adminOnly } from "../middleware/auth.js";
import { getBarCharts, getDashboardStats, getLineCharts, getPieCharts } from "../controller/stats.js";
const router = express.Router();

router.get("/stats", adminOnly, getDashboardStats);
router.get("/pie", adminOnly, getPieCharts);
router.get("/bar", adminOnly, getBarCharts);
router.get("/line", adminOnly, getLineCharts);

export default router;