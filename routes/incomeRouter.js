const express = require("express");
const incomeController = require("../controllers/incomeController");
const validateToken = require("../middleware/validateToken");

const router = express.Router();

router.post("/add-income", validateToken, incomeController.addIncome);
router.put("/edit-income/:incomeId", incomeController.editIncomeById);
router.get("/getincomes", incomeController.getIncomes);
router.get("/getincomebyid/:incomeId", incomeController.getIncomeById);
router.get("/getincomebyuserid/:userId", incomeController.getIncomeByUserId);
router.delete("/delete-income/:incomeId", incomeController.deleteIncomeById);


module.exports = router