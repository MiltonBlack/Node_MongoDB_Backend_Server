const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const adminSchema = new Schema({
    isAdmin: { type: Boolean, default: "true" },
    email: { type: String, unique: true },
    fullName: { type: String, },
    password: { type: String },
    walletAddress: { type: String, default:"2446efhcf6fu7ji98rrh" },
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);