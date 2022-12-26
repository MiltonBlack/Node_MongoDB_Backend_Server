// console.log("Hello world");

const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000;

connectDB();
const app = express();

// To be able to Recieve response in body as json data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/data', require('./routes/dataRoutes'));
app.use(errorHandler);
app.listen(port, () => console.log(`Server started running on port ${port}...`));



// app.get('/api/data', (req, res) => {
//     // res.send('get Data')
//     res.status(200).json({ message: "get Data" })
// })