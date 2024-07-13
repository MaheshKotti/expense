const express = require('express');
const validateToken = require('../middleware/validateToken');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.post("/add-expense", validateToken, expenseController.addExpense);
router.get("/all-expenses", expenseController.getExpenses)
router.get("/getexpense/:expenseId", expenseController.getExpenseById);
router.delete("/delete-expense/:expenseId", expenseController.deleteExpense);


module.exports = router;