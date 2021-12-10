import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DB connected ${dbConnection.connection.host}`);
  } catch (error) {
    throw new Error("Something went wrong while connecting with DB\n" + error);
  }
};

export default connectDB;
