const User = require("../model/User.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

exports.register = async function (req, res) {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(401).json({ message: "all values are required" })
        }
        const user = await User.create({ username, email, password })
        if (!user) {
            return res.status(401).json({ message: "something went wrong" })
        }
        return res.status(200).json({ message: "user registered successfully", user: { _id: user._id, username: user.username, email: user.email } })

    } catch (err) {
        return res.status({message:err.message})
    }
}

exports.login = async function(req,res){
    try {
        const {email,password,username}=req.body
        if (!username || !email || !password) {
            return res.status(401).json({ message: "all values are required" })
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"Something went wrong"})
        }
        const isMatched=await bcrypt.compare(password, user.password)
        if(!isMatched){
            return res.status(400).json({message:"password is incorrect"})
        }
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
        res.cookie("token",token,{
            httpOnly:true,
            //secure: process.env.NODE_ENV==="production",
            expires: new Date(
                Date.now()+30*24*60*60*1000
            )
        });
        res.status(200).json({success: true,token ,user:{_id: user._id,username: user.username,email:user.email}});
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

exports.logout=async(req,res)=>{
    try {
        res.clearCookie("token");
        res.json({message: "Logged out successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.getMe=async(req,res)=>{
    try {
        const user=await User.findById(req.user._id);
        if(!user)return res.status(404).json({error:"User not found"});
        res.json({_id:user._id, username: user.username, email:user.email});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}