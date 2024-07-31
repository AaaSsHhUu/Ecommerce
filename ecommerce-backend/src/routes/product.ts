import express,{Router} from "express";
import { createProduct, deleteProduct, getAdminProducts, getAllCategories, getAllProducts, getLatestProducts, getOneProduct, updateProduct } from "../controller/product.js";
import { adminOnly } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const router = Router();

// To create new product
router.post("/new", adminOnly, upload.single("photo"), createProduct);

// To get recently added 10 products
router.get("/latest", getLatestProducts);

// To get all unique Categories
router.get("/categories", getAllCategories);

// To get all products with filter
router.get("/all", getAllProducts);

// To get all products for admin
router.get("/admin-products",adminOnly, getAdminProducts )

// To getOne, deleteOne, and updateOne
router.route("/:id").get(getOneProduct).delete(adminOnly, deleteProduct).put( adminOnly ,upload.single("photo") ,updateProduct);

export default router;