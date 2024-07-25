const commonFunction = require("../commonFunctions/commonFunction");
const Income = require("../models/Income");
const User = require("../models/User");

const addIncome = async (req, res) => {
    const { incomeTitle, amount, date, category, description } = req.body;

    try {
        const user = await User.findById(req.userId);
        if (!user) {
            res.status(404).json({ error: "User not found" })
        }
        const newIncome = new Income({
            incomeTitle,
            amount: amount,
            date: new Date(date),
            category,
            description,
            user: user._id
        });
        const savedIncome = await newIncome.save();
        user.income.push(savedIncome);
        await user.save()
        res.status(200).json({ message: "Income added successfully", newIncome });

    } catch (error) {
        commonFunction.errorMessage(res, error)
    }
}

const getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find().populate("user");
        res.status(200).json({ incomes });

    } catch (error) {
        commonFunction.errorMessage(res, error);
    }
}

const getIncomeById = async (req, res) => {
    const incomeId = req.params.incomeId;
    try {
        const income = await Income.findById(incomeId);
        if (!income) {
            return res.status(404).json({ info: "income not found with the given id" });
        }
        const user = await User.findById(income.user);
        if (!user) {
            return res.status(404).json("user not found with the given income id")
        }
        res.status(200).json({ userName: user.userName, income })

    } catch (error) {
        commonFunction.errorMessage(res, error);
    }
}

const getIncomeByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "No user found" });
        }
        const incomes = await Income.find({ user: userId });
        let totalAmount = incomes.reduce((totalAmount, income) => totalAmount + income.amount, 0);
        res.status(200).json({ userName: user.userName, incomes, totalAmount: totalAmount })

    } catch (error) {
        commonFunction.errorMessage(res, error);
        return
    }
}

const editIncomeById = async (req, res) => {

    const { incomeTitle, amount, date, category, description } = req.body;

    const incomeId = req.params.incomeId;
    try {
        const income = await Income.findById(incomeId);
        if (!income) {
            return res.status(404).json({ error: "income not found with the given id" });
        }

        const newIncome = await Income.findByIdAndUpdate(
            { _id: income._id },
            {
                $set: {
                    incomeTitle: incomeTitle,
                    amount: amount,
                    date: new Date(date),
                    category: category,
                    description: description
                }
            },
            { new: true }
        )
        res.status(200).json({ message: "income Updated Successfully", newIncome })

    } catch (error) {
        commonFunction.errorMessage(res, error);
        return
    }
}

const deleteIncomeById = async (req, res) => {
    const incomeId = req.params.incomeId;

    try {
        const income = await Income.findByIdAndDelete(incomeId);
        if (!Income) {
            return res.status(404).json({ info: "income not found with the given id" })
        }
        res.status(200).json(income)
    } catch (error) {
        commonFunction.errorMessage(res, error);
    }
}

module.exports = { addIncome, getIncomes, getIncomeById, getIncomeByUserId, editIncomeById, deleteIncomeById }