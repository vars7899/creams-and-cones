import express from "express";
const router = express.Router();
import {
  createOrder,
  getOrderByStoreId,
  getOrders,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getOrders);
router.route("/:storeId").get(getOrderByStoreId).post(protect, createOrder);

export default router;
