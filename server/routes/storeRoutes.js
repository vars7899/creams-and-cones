import express from "express";
import {
  createStoreReview,
  createStore,
  deleteStore,
  getStoreReviews,
  getStore,
  getStoreInfo,
  updateStore,
  deleteStoreReview,
  updateStoreReview,
} from "../controllers/storeControllers.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getStore);
router.route("/create").post(protect, admin, createStore);
router
  .route("/:id")
  .get(getStoreInfo)
  .put(protect, admin, updateStore)
  .delete(protect, admin, deleteStore);
router
  .route("/:id/reviews")
  .get(getStoreReviews)
  .post(protect, createStoreReview);
router
  .route("/:id/reviews/:reviewId")
  .delete(protect, deleteStoreReview)
  .put(protect, updateStoreReview);
export default router;
