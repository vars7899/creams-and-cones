import express from "express";
const router = express.router();
// imports controllers

// Fetch all the products from DB
router.route("/").get(getProduct);
router.route("/create").post(createProduct);
router.route("/:id").get(getProductById).put(editProduct);

export default router;
