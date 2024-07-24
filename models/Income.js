const mongoose = require("mongoose");


const incomeSchema = new mongoose.Schema({

    // incomeName, amount, date, category, description

    incomeTitle: {
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
            enum: ["Salary", "Stock", "Intrest", "Youtube", "Marketing", "Others"]

        }
    ],
    description: {
        type: String,
    },
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income