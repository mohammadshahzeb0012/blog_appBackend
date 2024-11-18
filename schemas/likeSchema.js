const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    likedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog",
        required: true
    }
})

module.exports = mongoose.model("like",likeSchema)