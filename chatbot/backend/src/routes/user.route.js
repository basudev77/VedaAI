const router=require("express").Router()
const {register, login, logout, getMe}=require("../controller/user.controller")
const auth=require("../middleware/auth")

router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.get("/getme",auth,getMe)

module.exports=router