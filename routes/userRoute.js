const express = require("express")
const userRouter = express.Router()
const { registerController, loginController ,editProfile, myProfileController} = require("../controllers/userController")
const iaAuth = require("../middlewares/iaAuth")

userRouter.post('/register',registerController)
userRouter.post("/login",loginController)
userRouter.post("/editProfile",iaAuth,editProfile)
userRouter.get("/myProfile",iaAuth,myProfileController)

module.exports = userRouter