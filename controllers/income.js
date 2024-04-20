const moment =require('moment') ; 
const Income =require("../models/income");

async function handleAddIncome(req, res) {
  const { title, amount, description, date } = req.body;
  try {
    const formattedDate = moment(date, "DD-MM-YYYY").toDate(); // Format the date string
    const income = await Income.create({
      title,
      amount,
      description,
      date: formattedDate, // Use the formatted date
    });
    console.log(income);
    res.status(200).json({ mssg: "succesfully added" });
  } catch (error) {
    console.log(error);
  }
}
async function handleGetAllIncome(req, res) {
  try {
    const incomes = await Income.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ mssg: "server error" });
  }
}
async function handleDeleteIncome(req,res){
    const{id} = req.params ; 
    Income.findByIdAndDelete(id)
    .then((income)=>{
        res.status(200).json({mssg:"income delted"}) ;
    })
    .catch((err)=>{
        res.status(500).json({mssg:"server error"}) ;
    })
}
module.exports ={handleAddIncome ,handleGetAllIncome,handleDeleteIncome}