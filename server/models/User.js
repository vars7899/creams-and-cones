import mongoose from "mongoose";
import bcrypt from "bcrypt";

// wallet schema
const walletSchema = new mongoose.Schema({
  wallet_points: {
    type: Number,
    default: 0,
  },
  wallet_cash: {
    type: Number,
    default: 0,
  },
});

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      default: null,
      required: true,
    },
    last_name: {
      type: String,
      default: null,
      required: true,
    },
    username: {
      type: String,
      default: null,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    wallet: walletSchema,
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);
// check the user password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// before we save the password for the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("user", userSchema);
export default User;
