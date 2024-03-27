const mongoose = require("mongoose");
require("dotenv").config();

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  
  const connectDatabase = async () => {
    try {
      console.log("DB_URI:", process.env.DB_URI);

      await mongoose.connect(process.env.DB_URI, connectionParams);
      console.log("Database Connected");
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  module.exports = connectDatabase;