const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  try {
    const connect = await mongoose.connect(uri, {});
    console.log("connected to database:", connect.connection.host);
  } catch (err) {
    console.error("Mongo connection error", err);
    process.exit(1);
  }
};

module.exports = connectDB;
