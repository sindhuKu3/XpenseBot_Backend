const moment =require('moment') ; 
const Expense =require("../models/expense");

async function handleAddExpense(req, res) {
    const { title, amount, description, date } = req.body;
    try {
        const formattedDate = moment(date, 'DD-MM-YYYY').toDate(); // Format the date string
        const expense = await Expense.create({
            title,
            amount,
            description,
            date: formattedDate, // Use the formatted date
        });
        console.log(expense);
        res.status(200).json({mssg:"succesfully added"}) ;
    } catch (error) {
        console.log(error);
    }
}
async function handleGetAllExpense(req,res){
    try {
        const expenses = await Expense.find().sort({createdAt:-1}) ; 
        res.status(200).json(expenses)  ;
    } catch (error) {
        res.status(500).json({mssg:"server error"})
    }  
}

async function handleDeleteExpense(req,res){
    const{id} = req.params ; 
    Expense.findByIdAndDelete(id)
    .then((expense)=>{
        res.status(200).json({mssg:"expense deleted"}) ;
    })
    .catch((err)=>{
        res.status(500).json({mssg:"server error"}) ;
    })
}
module.exports ={handleAddExpense ,handleGetAllExpense,handleDeleteExpense}