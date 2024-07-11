import mongoose from "mongoose";

let connected = false;

const connectDb = async () => {
  mongoose.set("strictQuery", true);

  if (connected) {
    console.log("You have already connected.");
    return;
  }

  // connect to db
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("You are connected.");
  } catch (error) {
    console.error(error.message);
  }
};

export default connectDb;
