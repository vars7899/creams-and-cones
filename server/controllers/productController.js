import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

// @desc    fetch all the products
// @route   GET /api/products/
// @access  public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  products.length === 0
    ? res.status(200).json({ message: "No products were found in the store" })
    : res.status(200).json(products);
});

// @desc    fetch one product by Id
// @route   GET /api/products/:id
// @access  public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  !product
    ? res.json({ message: "Invalid Product ID, product not found" })
    : res.json(product);
});

// @desc    Create Product
// @route   POST /api/products/create
// @access  private ADMIN
export const createProduct = asyncHandler(async (req, res) => {
  const { name, image, brand, category, desc, price, countInStock } = req.body;
  if (!(name && image && brand && category && desc && price && countInStock)) {
    res.status(400).json({
      message: "Missing one or more required fields",
      success: false,
    });
  }
  // check if the name is available
  const nameAlreadyExist = await Product.findOne({ name });
  if (nameAlreadyExist) {
    res.status(400).json({
      message: `${name} is already taken, please try a different name`,
      success: false,
    });
  }
  const newProduct = await Product.create({
    user: req.user._id,
    name,
    image,
    brand,
    category,
    desc,
    price,
    countInStock,
  });

  newProduct
    ? res.status(201).json({
        message: `${newProduct.name} was created successfully`,
        success: true,
        product: newProduct,
      })
    : res.status(400).json({
        message: `${name} could not be created`,
        success: false,
      });
});

// @desc    delete a Product by Id
// @route   DELETE /api/products/:id
// @access  private ADMIN
export const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  product
    ? res.status(200).json({
        message: "Product was deleted",
        success: true,
      })
    : res.status(400).json({
        message: "Something went wrong, Product could not deleted",
        success: false,
      });
});

// @desc    edit a Product by Id
// @route   PUT /api/products/:id
// @access  private ADMIN
export const editProductById = asyncHandler(async (req, res) => {
  const { name, image, brand, category, desc, price, countInStock } = req.body;
  // find the product by id
  const product = await Product.findById(req.params.id)
    .populate("user")
    .select("-password");

  if (!product) {
    res.status(400).json({
      message: "Invalid Product Id, product not found",
      success: false,
    });
  } else {
    product.name = name || product.name;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.desc = desc || product.desc;
    product.price = price || product.price;
    product.countInStock = countInStock || product.countInStock;
    // save the new edited product
    const editedProduct = await product.save();

    res.json({
      message: `${editedProduct.name} was edited successfully by ${editedProduct.user.username}`,
      success: true,
      name: editedProduct.name,
      image: editedProduct.image,
      brand: editedProduct.brand,
      category: editedProduct.category,
      desc: editedProduct.desc,
      price: editedProduct.price,
      countInStock: editedProduct.countInStock,
    });
  }
});
