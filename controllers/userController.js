const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const { registerModel, editProfileModel, findUser } = require("../models/userModel")

const registerController = async (req, res) => {

    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "missing data!"
        })
    }

    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
        return res.status(400).json({
            message: "invalid data!"
        })
    }

    try {

        const userExits = await findUser(email)
        if (userExits) {
            return res.status(400).json({
                message: "user already registerd!"
            })
        }

        await registerModel(name, email, password)
        return res.status(201).json({
            message: "register success!"
        })
    } catch (error) {
        return res.status(500).json({
            message: "server error!"
        })
    }
}

const loginController = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            message: "missing data!"
        })
    }

    if (typeof email !== "string" || typeof password !== "string") {
        return res.status(400).json({
            message: "invalid data!"
        })
    }

    try {
        const userDb = await findUser(email)
        if (!userDb) {
            return res.status(400).json({
                message: "user not found!"
            })
        }

        const isMatched = await bcrypt.compare(password, userDb.password)

        if (!isMatched) {
            return res.status(401).json({
                message: "invalid credationals!"
            })
        }

        const payload = {
            name: userDb.name,
            email: userDb.email,
            _id: userDb._id
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY)

        return res.status(200).json({
            token: token,
            user: payload
        })
    } catch (error) {
        return res.status(500).json({
            message: "server error!"
        })

    }
}

const editProfile = async (req, res) => {
    const { name, email, password } = req.body
    const user = req.user
    const payload = {}
    if (name) payload.name = name
    if (email) payload.email = email
    if (password) payload.password = password

    try {
        const userExists = await findUser(user.email)

        if (!userExists) {
            return res.status(400).json({
                message: "user not found!"
            })
        }

        const editDb = await editProfileModel(user, payload)
        return res.status(200).json({
            message: "profile updated",
            data: editDb
        })
    } catch (error) {
            return res.status(500).json({
                message: "server error!"
            })        
    }
}

const myProfileController = async(req,res)=>{
    const user = req.user
    try {
        const userExists = await findUser(user.email)
        if (!userExists) {
            return res.status(400).json({
                message: "user not found!"
            })
        }

        return res.status(200).json({
            message: "fetch success",
            data: userExists
        })
    } catch (error) {
        return res.status(500).json({
            message: "server error!"
        })    
    }
}

module.exports = {
    registerController,
    loginController,
    editProfile,
    myProfileController
}