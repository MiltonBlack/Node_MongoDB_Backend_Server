const mongoose = require('mongoose');
const MONGO_URI_CONN = 'mongodb+srv://Blackdice:Black177@cluster0.1gxkqc6.mongodb.net/BTCPAY?retryWrites=true&w=majority'
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(MONGO_URI_CONN);
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  }
  
  module.exports = connectDB