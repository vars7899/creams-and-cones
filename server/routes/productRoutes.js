import express from "express";
const router = express.Router();
// import middleware
import { protect, admin } from "../middleware/authMiddleware.js";
// imports controllers
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
} from "../controllers/productController.js";

// Fetch all the products from DB
router.route("/").get(getProducts);
router.route("/create").post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(deleteProductById)
  .put(editProductById);
export default router;
