const mongoose=require("mongoose")

const connectDb=async function(){
    try{
        const connection=await mongoose.connect(process.env.MONGO_URI)
        console.log("mongoDb connected at",connection.connection.port)
    }
    catch(err){
        console.log(err)
    }
}

module.exports=connectDb