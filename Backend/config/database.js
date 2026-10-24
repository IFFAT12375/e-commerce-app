const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const data = await mongoose.connect(process.env.DB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`Mongodb connected with server: ${data.connection.host}`);
    return data;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

module.exports = connectDatabase;