const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('Auth', authSchema);