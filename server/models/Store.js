import mongoose from "mongoose";
import { reviewSchema } from "./Review.js";

const nearbySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const storeSchema = new mongoose.Schema(
  {
    store_name: {
      type: String,
      required: true,
      unique: true,
    },
    store_location_lat: {
      type: String,
      required: true,
    },
    store_location_lng: {
      type: String,
      required: true,
    },
    store_address: {
      type: String,
      required: true,
    },
    store_city: {
      type: String,
      required: true,
    },
    store_postal_code: {
      type: String,
      required: true,
    },
    store_country: {
      type: String,
      required: true,
    },
    store_timing: {
      monday_open: {
        type: Number,
        required: true,
      },
      monday_close: {
        type: Number,
        required: true,
      },
      tuesday_open: {
        type: Number,
        required: true,
      },
      tuesday_close: {
        type: Number,
        required: true,
      },
      wednesday_open: {
        type: Number,
        required: true,
      },
      wednesday_close: {
        type: Number,
        required: true,
      },
      thursday_open: {
        type: Number,
        required: true,
      },
      thursday_close: {
        type: Number,
        required: true,
      },
      friday_open: {
        type: Number,
        required: true,
      },
      friday_close: {
        type: Number,
        required: true,
      },
      saturday_open: {
        type: Number,
        required: true,
      },
      saturday_close: {
        type: Number,
        required: true,
      },
      sunday_open: {
        type: Number,
        required: true,
      },
      sunday_close: {
        type: Number,
        required: true,
      },
    },
    store_phone: {
      type: Number,
      required: true,
    },
    store_nearby: [nearbySchema],
    store_reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("Store", storeSchema);
export default Store;
