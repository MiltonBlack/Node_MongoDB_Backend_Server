const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const depositSchema = new Schema({
    amount: String,
    status: String,
    pending: Boolean,
    deposits: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Deposits', depositSchema);