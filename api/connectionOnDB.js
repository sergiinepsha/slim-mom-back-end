const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const { MONGODB_URL } = process.env;

module.exports = function connectionOnDB() {
  try {
    const connectDB = mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (connectDB) {
      console.log("\x1b[33m%s\x1b[0m", "Database connection successful");
    }
  } catch (error) {
    // TODO: error handler "No database connection!";
  }
};
