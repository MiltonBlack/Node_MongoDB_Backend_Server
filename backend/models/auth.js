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
    address: {
        type: String,
        default: ""
    },
    phoneNumber: {
        type: String,
    },
    plan: {
        type: String,
        default: "none"
    },
    startDate: {
        type: String,
        default: ""
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
        default: "fw47g82rgb482hrbrfui4834h984r398hfnfwo"
    },
    approved: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "pending"
    },
    investment: {
        type: String,
        default: "pending"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    deposits: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Deposits'
    }],
    subscriptions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscriptions'
    }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);