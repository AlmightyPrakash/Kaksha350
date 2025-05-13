const mongoose=require('mongoose')
const connectDB=async()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to MonoDB database")

    }catch(error){
        console.log(`MongoDB connection error ${error}`)
    }
}
module.exports=connectDB;