import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import storeRoutes from "./routes/storeRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// connecting to the DB
connectDB();

// routes
app.use("/api/users", userRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/products", productRoutes);

// serving to the port
app.listen(PORT, () => {
  console.log(`Server UP on Port --> ${PORT}\nvisit http://localhost:${PORT}`);
});
