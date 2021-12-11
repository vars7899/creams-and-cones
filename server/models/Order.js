import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        qty: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
        userCustomizeAdd: [
          {
            name: {
              type: String,
            },
          },
        ],
        userCustomizeSub: [
          {
            name: {
              type: String,
            },
          },
        ],
        allergy: {
          type: String,
          default: "none",
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    store: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "store",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    taxPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    orderAt: {
      type: Date,
    },
    paidAt: {
      type: Date,
    },
    isPicked: {
      type: Boolean,
      required: true,
      default: false,
    },
    pickedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("order", orderSchema);
export default Order;
