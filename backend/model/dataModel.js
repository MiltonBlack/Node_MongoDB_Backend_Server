const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('Data', dataSchema);