const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const adminAuthSchema = new Schema({
    email: String,
    fullName: String,
    isAdmin: { type: Boolean, default: true },
    password: String,
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminAuthSchema);