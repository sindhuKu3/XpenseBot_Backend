const {createHmac , randomBytes} = require("crypto") ; 
const {mongoose} =require("mongoose") ; 
const { createTokenForUser } = require("../services/authentication");
const userSchema = new mongoose.Schema({
fullName:{
    type:String,
    required: true,
    unique: true,
},
email:{
    type:String,
    required:true ,
    unique:true 
},
salt:{
    type:String
},
password:{
    type:String,
    required:true ,  
},
profileImage:{
    type:String,
    default:"/images/default.jpg",
   
},
role:{
    type:String,
    enum:["USER","ADMIN"],
    default:"USER"
}
},{timestamps:true}) ; 

//hashing of password
userSchema.pre('save', function(next){
    const user = this ;
if(!user.isModified("password")){return ; }
const salt = randomBytes(16).toString() ; 
const hashedPassword = createHmac('sha256',salt)
                          .update(user.password) 
                          .digest("hex") ; 

    this.salt = salt ; 
    this.password = hashedPassword ;
    next() ; 
})
//matching of password given by user with password which we already have in our db for that user
userSchema.static('matchPasswordAndGenerateToken',async function(email,password){
    const user = await this.findOne({email}) 
    console.log(user) ; 
    //thapa
  
    if(!user)throw new Error('user not found') ; 
    const salt = user.salt ; 
    const hashedpassword = user.password ; 
    const userProvidedHash =createHmac("sha256" , salt) 
    .update(password)
    .digest('hex') ;
    if(hashedpassword !== userProvidedHash){throw new Error("incorrect password") }; 
    const token = createTokenForUser(user);
     console.log(token) ; 
    return token ;  
});
const User =mongoose.model("user", userSchema);

module.exports = User;