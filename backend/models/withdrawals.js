const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const withdrawalSchema = new Schema({
    user_id: { type: String },
    withdrawAmount: { type: String, },
    walletAddress:{type:String},
    status: { type: String, default: "pending" },
    pending: { type: Boolean, },
}, { timestamps: true });

module.exports = mongoose.model('Withdrawals', withdrawalSchema);