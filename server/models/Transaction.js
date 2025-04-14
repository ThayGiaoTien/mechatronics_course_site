
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    price: Number,
    date: { type: Date, default: Date.now }
  });
const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;
