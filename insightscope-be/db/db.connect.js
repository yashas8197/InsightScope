const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoURI = process.env.MONGODB;

const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection) {
      console.log("connected Successfully");
    }
  } catch (error) {
    console.log("Connection Failed", error);
    process.exit(1);
  }
};

module.exports = { initializeDatabase };
