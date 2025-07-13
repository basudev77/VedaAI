const auth =require("../middleware/auth")

const {generateChat}=require("../controller/chat.controller")
const router=require("express").Router()

router.get("/generate",auth,generateChat)
module.exports=router