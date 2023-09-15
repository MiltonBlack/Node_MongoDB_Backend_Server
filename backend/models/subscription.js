const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const subscriptionSchema = new Schema({
    amount: String,
    status: String,
    plan: String,
    user_id: String,
    deposit_id: String,
}, { timestamps: true });

module.exports = mongoose.model('Subscriptions', subscriptionSchema);