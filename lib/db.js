import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);

    console.log("Connected to MongoDB!!!!!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectToDb;
