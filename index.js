const express = require('express')
const dotenv = require('dotenv')
const config = require('./backend/config')
const connectDB = require('./backend/db')
const cors = require('cors')
const authRoute = require('./backend/routes/authRoutes');
const adminRoute = require('./backend/routes/adminRoutes')
const port = process.env.PORT || 3005
dotenv.config();
if (!process.env.PORT) {
    process.exit(1);
}

connectDB();
const app = express();
app.use(cors({ credentials: true })); 
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.listen(port, () => {
    console.log(`Backend Server Started and Running on Port ${port}...`)
});