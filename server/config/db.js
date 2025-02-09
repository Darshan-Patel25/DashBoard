const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

if (!process.env.MONGODB_URL) {
  throw new Error("please provide mongodb url");
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("db connnected succesfully");
  } catch (error) {
    console.log("mongodb connect error", error);
    process.exit(1);
  }
}
module.exports = connectDB;
