const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Data', dataSchema);