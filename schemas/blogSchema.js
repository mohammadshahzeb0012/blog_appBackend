const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 3,
        maxlength: 255,
        required: true
    },
    content: {
        type: String,
        minLength: 5,
        maxlength: 255,
        required: true
    },
    tags: [String],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    createdAt: {
        type: String,
        default: Date.now()
    }
})

module.exports = mongoose.model("blog", blogSchema)