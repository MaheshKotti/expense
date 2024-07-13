const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({

    expenseTitle: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    category: [
        {
            type: String,
            enum: ["Education", "Groceries", "Medical", "Shopping", "Travelling", "Others"],
            required: true
        }
    ],
    description: {
        trype: String
    },
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})


const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;