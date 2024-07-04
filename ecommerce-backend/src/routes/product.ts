import express,{Router} from "express";
import { createProduct, getAllCategories, getAllProducts, getLatestProducts } from "../controller/product.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.post("/new", isAuthenticated, isAdmin, upload.single("photo"), createProduct);
router.get("/latest", getLatestProducts);
router.get("/categories", getAllCategories);
router.get("/all", getAllProducts);

export default router;