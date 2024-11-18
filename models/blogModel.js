const blogSchema = require("../schemas/blogSchema")
const likeSchema = require("../schemas/likeSchema")
const userSchema = require("../schemas/userSchema")
const commentSchema = require("../schemas/commentSchema")

const findBlog = async (blogID) => {
    const response = await blogSchema.findOne({ _id: blogID })
    return response
}

const findLikeinDb = async (userID, blogId) => {
    const findLike = await likeSchema.findOne({
        likedBy: userID,
        blogId
    })
    return findLike
}

const creatBlogModel = async (user, title, content, tagsArr) => {
    const newBlog = new blogSchema({
        title,
        content,
        tags: tagsArr,
        postedBy: user._id
    })
    const response = await newBlog.save()
    return response
}

const editBlogModel = async (blogID, payLoad) => {
    const response = await userSchema.findOneAndUpdate(
        { _id: blogID },
        payLoad,
    )
    return response
}

const likeBlogModel = async (userID, blogId, type) => {
    if (type === "delete") {
        const unlikedRes = await likeSchema.findOneAndDelete({
            likedBy: userID,
            blogId
        })
        return unlikedRes
    } else {
        const newLike = new likeSchema({
            likedBy: userID,
            blogId
        })
        const response = await newLike.save()
        return response
    }
}

const postCommentModel = async (userID, blogid, comment) => {
    const newComment = new commentSchema({
        comment: comment,
        commentedBy: userID,
        blogId: blogid
    })
    const commentRes = await newComment.save()
    return commentRes
}


const allBlogsModel = async () => {
    const response = await blogSchema.find().populate("postedBy")
    return response
}

const myblogsModel = async (user) => {
    const response = await blogSchema.find({ postedBy: user._id }).populate("postedBy")
    return response
}

module.exports = {
    creatBlogModel,
    allBlogsModel,
    myblogsModel,
    findBlog,
    editBlogModel,
    likeBlogModel,
    findLikeinDb,
    postCommentModel
}