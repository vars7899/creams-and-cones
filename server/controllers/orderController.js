import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Store from "../models/Store.js";

// @desc    fetch all the orders
// @route   GET /api/orders/
// @access  private
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.findById(req.user.id);
  orders
    ? res.json(orders)
    : res.status(200).json({
        message: "No order found",
        numOrders: 0,
      });
});

// @desc    fetch order from store Id
// @route   GET /api/orders/:storeId
// @access  private
export const getOrderByStoreId = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.storeId);
  if (store) {
    const orders = await Order.find({ store }).populate("store");
    orders
      ? res.json(orders)
      : res.status(200).json({
          message: "No order found",
          numOrders: 0,
        });
  }
});

// @desc    create a new order
// @route   POST /api/orders/create
// @access  private
export const createOrder = asyncHandler(async (req, res) => {
  // grab the store from params
  const storeId = req.params.storeId;
  //   check if the store exist
  const store = await Store.findById(storeId);
  if (store) {
    const {
      orderItems,
      paymentMethod,
      paymentResult,
      isPaid,
      taxPrice,
      totalPrice,
      isPicked,
    } = req.body;
    // grab user info
    const user = await Order.findById(req.user.id).select("-password");
    // create the order
    const order = await Order.create({
      user: req.user.id,
      orderItems,
      store: store._id,
      paymentMethod,
      paymentResult,
      isPaid,
      taxPrice,
      totalPrice,
      isPicked,
      orderAt: Date(Date.now()),
    });
    if (order) {
      res.status(200).json({
        message: "order was successfully placed",
        success: true,
        order,
        user,
      });
    } else {
      res.status(400).json({
        message: "Order could not be placed",
        success: false,
      });
    }
  } else {
    res.status(400).json({
      message: "Invalid store ID, no store found",
      success: false,
    });
  }
});
