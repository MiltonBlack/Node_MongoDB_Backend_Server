const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${process.env.MONGO_URI}`.cyan.underline);
        const db = mongoose.connection
        db.once("open", _=> {
            console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
        })
        db.on('error', err => {
            console.error('connection error');
        })
    } catch (error) {
        console.log(error); 
        process.exit(1)
    }
}

module.exports = connectDB;