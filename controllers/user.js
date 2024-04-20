const User = require("../models/user");

async function handleUserSignUp(req, res) {
    const{fullName , email,password} = req.body ; 
     try {  
        const user = await User.create({
                      fullName ,
                      email,
                      password,
                  });
                  console.log(user);
                  res.status(200).json({user}) ;
                
              } catch (error) {
                res.json("fail") ; 
                console.log(error) ;

              }
        }
 

async function handleUserLogOut(req,res){
    const{id} = req.params ; 
    User.findByIdAndDelete(id)
    .then((user)=>{
        res.status(200).json({mssg:"user logout Successfull"}) ;
    })
    .catch((err)=>{
        res.status(500).json({mssg:"server error"}) ;
    })
}
async function handleGetAllUser(req,res){
    try {
        const users = await User.find().sort({createdAt:-1}) ; 
        res.status(200).json(users)  ;
    } catch (error) {
        res.status(500).json({mssg:"server error"})
    }  
}

async function handleUserSignIn(req,res){
        const{email,password} = req.body ; 
        try{
         const token = await User.matchPasswordAndGenerateToken(email,password) ; 
          
         res.cookie("token" , token) ;
         res.status(200).json({mssg:"success"}); 
        }catch(error){
            res.status(500).json({mssg:"incorrect email and password"})
         }
        }
       
//function for getting user-data

       module.exports = {handleUserLogOut,handleUserSignIn,handleUserSignUp,handleGetAllUser}