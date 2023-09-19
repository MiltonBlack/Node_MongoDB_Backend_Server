const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    country:{
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    phoneNumber: {
        type: String,
    },
    plan:{
        type: String,
        default: "None"
    },
    balance: {
        type: String,
        default: "50"
    },
    walletType: {
        type: String,
        default: "Bitcoin"
    },
    walletAddress: {
        type: String,
        default: ""
    },
    investment: {
        type: String,
        default: "pending"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    planStatus:{
        type: Boolean,
        default:false
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });  

module.exports = mongoose.model("User", userSchema);