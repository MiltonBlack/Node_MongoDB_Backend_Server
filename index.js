const express = require('express')
const dotenv = require('dotenv')
const config = require('./backend/config')
const connectDB = require('./backend/db')
const cors = require('cors')
const authRoute = require('./backend/routes/authRoutes');
dotenv.config();
if (!process.env.PORT) {
    process.exit(1);
}

connectDB();
const app = express();
app.use(cors({ credentials: true })); 
app.use(express.json());
app.use("/api/auth", authRoute);
app.listen(3005, () => {
    console.log("Backend Server Started and Running on Port 3005...")
});