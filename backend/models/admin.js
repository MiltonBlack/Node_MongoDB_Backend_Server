const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const adminSchema = new Schema({
    isAdmin: { type: Boolean, default: "true" },
    email: { type: String, unique: true },
    fullName: { type: String, },
    password: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);