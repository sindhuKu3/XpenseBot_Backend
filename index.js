require('dotenv').config() ; 
const express = require('express') ; 
const cors = require('cors') ; 
const { db } = require('./db/db');
const app = express() ; 
const path = require("path") ;
const PORT = process.env.PORT ; 
const cookieParser = require("cookie-parser") ; 
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const userRoute = require('./routes/user') ;
const transactionRoute = require("./routes/transaction");
//middlewares
app.use(express.urlencoded({extended:false})) ; 
app.use(express.json()) ; 
app.use(
  cors({
    origin: "xpense-bot-frontend.vercel.app",
    credential: true,
    method: ["GET", "POST", "PUT", "DELETE"],
  })
); 

app.use(cookieParser()) ; 
app.use(checkForAuthenticationCookie("token")) ;


app.use("/api/users" , userRoute) ;
app.use("/api/transaction", transactionRoute);




const server=()=>{
    db() ; 
    app.listen(PORT,()=>{console.log(`server started at PORT ${PORT}`)})
}
server() ; 
