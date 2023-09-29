const mongoose = require('mongoose');
const MONGO_URI_CONN = 'mongodb+srv://Blackdice:Black177@cluster0.1gxkqc6.mongodb.net/BTCPAY?retryWrites=true&w=majority'
const connectDB = async () => {
    try {
       await mongoose.connect(MONGO_URI_CONN);
      //  await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  }
  
  module.exports = connectDB