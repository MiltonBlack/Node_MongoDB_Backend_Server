const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const subscriptionSchema = new Schema({
    amount: String,
    status: String,
    plan: String,
    pending: Boolean,
    subscriptions: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Subscriptions', subscriptionSchema);