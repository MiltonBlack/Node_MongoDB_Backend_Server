const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const adminAuthSchema = new Schema({
    amount: String,
    status: String,
    pending: Boolean,
    users: {
        type: Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Admin', adminAuthSchema);