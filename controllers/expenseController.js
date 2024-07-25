const commonFunction = require('../commonFunctions/commonFunction');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Expense = require('../models/Expense');

const addExpense = async (req, res) => {

    const { expenseTitle, amount, date, category, description } = req.body;

    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ info: "User not found with the given id" })
        }
        const expense = new Expense({
            expenseTitle,
            amount: amount,
            date: new Date(date),
            category,
            description,
            user: user._id
        });
        const savedExpense = await expense.save();
        user.expense.push(savedExpense);
        await user.save();
        res.status(200).json(expense)

    } catch (error) {
        commonFunction.errorMessage(res, error);
    }
}

const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().populate("user");
        res.status(200).json({ expenses });

    } catch (error) {
        commonFunction.errorMessage(res, error);
    }
}

const getExpenseById = async (req, res) => {
    const expenseId = req.params.expenseId;
    try {
        const expense = await Expense.findById(expenseId);
        if (!expense) {
            return res.status(404).json({ info: "expense not found with the given id" });
        }
        const user = await User.findById(expense.user);
        if (!user) {
            return res.status(404).json("user not found with the given expense id")
        }
        res.status(200).json({ userName: user.userName, expense })

    } catch (error) {
        commonFunction.errorMessage(res, error);
    }
}

const getExpenseByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "No user found" });
        }
        const expenses = await Expense.find({ user: userId });
        let totalAmount = expenses.reduce((totalAmount, expense) => totalAmount + expense.amount, 0);
        res.status(200).json({ userName: user.userName, expenses, totalAmount: totalAmount })

    } catch (error) {
        commonFunction.errorMessage(res, error);
        return
    }
}

const EditExpenseById = async (req, res) => {

    const { expenseTitle, amount, date, category, description } = req.body;

    const expenseId = req.params.expenseId;
    try {
        const expense = await Expense.findById(expenseId);
        if (!expense) {
            return res.status(404).json({ error: "expense not found with the given id" });
        }

        const newExpense = await Expense.findByIdAndUpdate(
            { _id: expense._id },
            {
                $set: {
                    expenseTitle: expenseTitle,
                    amount: amount,
                    date: new Date(date),
                    category: category,
                    description: description
                }
            },
            { new: true }
        )
        res.status(200).json({ message: "Expense Updated Successfully", newExpense })

    } catch (error) {
        commonFunction.errorMessage(res, error);
        return
    }
}

const deleteExpense = async (req, res) => {
    const expenseId = req.params.expenseId;

    try {
        const expense = await Expense.findByIdAndDelete(expenseId);
        if (!expense) {
            return res.status(404).json({ info: "expense not found with the given id" })
        }
        res.status(200).json(expense)
    } catch (error) {
        commonFunction.errorMessage(res, error);
    }
}

module.exports = { addExpense, getExpenseById, getExpenseByUserId, getExpenses, deleteExpense, EditExpenseById }