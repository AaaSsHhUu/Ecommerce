import express,{Router} from "express";
import { createProduct } from "../controller/product.js";
import { isAdmin } from "../middleware/auth.js";
import { singleUpload } from "../middleware/multer.js";

const router = Router();

router.post("/new",isAdmin, singleUpload ,createProduct);

export default router;