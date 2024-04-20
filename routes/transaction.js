const {Router} = require("express") ; 
const { handleAddIncome, handleGetAllIncome, handleDeleteIncome } = require("../controllers/income");
const { handleAddExpense, handleGetAllExpense, handleDeleteExpense } = require("../controllers/expense");

const router = Router() ; 
router.post("/add-income",handleAddIncome);
router.get("/get-incomes", handleGetAllIncome);
router.delete("/delete-income/:id",handleDeleteIncome);
router.post("/add-expense",handleAddExpense);
router.get("/get-expenses",handleGetAllExpense);
router.delete("/delete-expense/:id",handleDeleteExpense);
module.exports = router ; 