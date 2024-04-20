const {Router} = require("express") ; 
const User = require("../models/user") ; 
const { handleUserSignUp, handleUserSignIn, handleUserLogOut, handleGetAllUser } = require("../controllers/user");
const router = Router() ;
 
router.post("/signup",handleUserSignUp);
router.post("/signin",handleUserSignIn);
router.delete("/logout/:id",handleUserLogOut);
router.get("/getuser",handleGetAllUser);

module.exports= router ;
