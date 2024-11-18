const express = require("express")
const app = express()
require("dotenv").config()
const clc = require("cli-color")
const cors = require("cors")
const PORT = process.env.PORT || 8000

// file imports
const db = require("./db.js")
const userRouter = require("./routes/userRoute.js")
const blogRouter = require("./routes/blogRoute.js")

// middlewares 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use("/user",userRouter)
app.use("/blog",blogRouter)
app.get("/",(req,res)=>{
    return res.send("home")
})

app.listen(PORT, () => {
    console.log(
        clc.yellowBright.bold.underline(`http://localhost:${PORT}`)
    )
})