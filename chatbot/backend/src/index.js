const express=require("express")
const app=express()
const cors=require("cors")
const connectDb=require("./config/db")
const userRoute=require("./routes/user.route")
const chatRoute=require("./routes/chat.route")
const cookieParser=require("cookie-parser")

require("dotenv").config()
connectDb()
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))

app.use("/api/auth",userRoute)
app.use("/api/chat",chatRoute)

app.listen(process.env.PORT,()=>{
    console.log(`SERVER IS STARTED AT ${process.env.PORT}`);
})