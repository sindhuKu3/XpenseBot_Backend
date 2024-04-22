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
app.use(cors()); 

app.use(cookieParser()) ; 
app.use(checkForAuthenticationCookie("token")) ;

// app.use(
//   cors({
//     origin: ["https://xpense-bot-frontend.vercel.app/"],
//     methods: ["POST", "GET"],
//     credentials: true,
//   })
// );
app.use("/api/users" , userRoute) ;
app.use("/api/transaction", transactionRoute);

app.get("/",(req,res)=>{
  res.json("Hello");
})
//----deployement purpose-------------
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}





//----deployement purpose-------------

const server=()=>{
    db() ; 
    app.listen(PORT,()=>{console.log(`server started at PORT ${PORT}`)})
}
server() ; 
