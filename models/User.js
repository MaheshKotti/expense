const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // userName, email, password

    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    expense: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expense"
        }
    ],
    income: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Income"
        }
    ]

})

const User = mongoose.model('User', userSchema);

module.exports = User;