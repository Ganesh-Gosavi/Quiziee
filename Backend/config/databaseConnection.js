const mongoose = require("mongoose"); // Import mongoose for MongoDB interaction

exports.dbConnect = () => {
  // Connects to the MongoDB database using the URL stored in the MONGODB_URL environment variable
  return mongoose.connect(process.env.MONGODB_URL);
};
