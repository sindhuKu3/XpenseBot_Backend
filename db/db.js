const mongoose = require("mongoose") ;  
const db = async()=>{
    try {
        mongoose.set('strictQuery',false) ;
       await mongoose.connect("mongodb+srv://sindhuku3:lejmTtMjhUxMVeTP@cluster0.sniin3u.mongodb.net/Xpense_Bot?retryWrites=true&w=majority&appName=Cluster0",{
    
       }) ; 
       console.log('mongodb connected') ;  
    } catch (error) {
        console.log("Db connected error") ;
        console.log(error) ;
    }
}
module.exports={db} ; 
