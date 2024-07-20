const express = require('express');
const validateToken = require('../middleware/validateToken');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.post("/add-expense", validateToken, expenseController.addExpense);
router.get("/all-expenses", expenseController.getExpenses)
router.get("/getexpense/:expenseId", expenseController.getExpenseById);
router.get("/getexpenses/:userId", expenseController.getExpenseByUserId);
router.delete("/delete-expense/:expenseId", expenseController.deleteExpense);
router.put("/edit-expense/:expenseId", expenseController.EditExpenseById);

module.exports = router;