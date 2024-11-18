const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        maxlength: 200,
        required: true
    },
    commentedBy:{
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

module.exports = mongoose.model("comment",commentSchema)