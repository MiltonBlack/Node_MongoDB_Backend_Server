const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const depositSchema = new Schema({
    user_id: { type: String },
    amount: { type: String, },
    status: { type: String, default: "pending" },
    proofUrl: { type: String, },
    pending: { type: Boolean, },
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
}, { timestamps: true });

module.exports = mongoose.model('Deposits', depositSchema);