const userSchema = require("../schemas/userSchema")
const bcrypt = require("bcryptjs");

const findUser = async (email) => {
    const response = await userSchema.findOne({ email }).select("+password")
    return response
}

const registerModel = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT)
    )
    const newUser = new userSchema({
        name: name,
        email: email,
        password: hashedPassword,
    })
    const userDb = await newUser.save()
    return userDb
}

const editProfileModel = async (user, payload) => {
    const response = await userSchema.findOneAndUpdate({ email: user }, payload)
    return response
}

module.exports = {
    registerModel,
    editProfileModel,
    findUser
}