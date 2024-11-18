const { creatBlogModel, allBlogsModel, myblogsModel, findBlog, editBlogModel, likeBlogModel, findLikeinDb, postCommentModel } = require("../models/blogModel")
const { findUser } = require("./../models/userModel")
const mongoose = require("mongoose")

const creatBlogController = async (req, res) => {
    const user = req?.user
    const { title, content, tags } = req.body

    if (!title || !content || !tags) {
        return res.status(400).json({
            message: "missing data!"
        })
    }

    if (typeof title !== "string" || typeof content !== "string" || typeof tags !== "string") {
        return res.status(400).json({
            message: "invalid data!"
        })
    }

    const tagsArr = tags.split(",")
    try {
        const blogDb = await creatBlogModel(user, title, content, tagsArr)
        return res.status(201).json({
            message: "blog created success!",
            data: blogDb
        })
    } catch (error) {
        return res.status(500).json({
            message: "server error!"
        })
    }
}

const editBlogController = async (req, res) => {
    const { title, content, tags, blogID } = req.body
    const user = req.user

    if (!blogID || !mongoose.Types.ObjectId.isValid(blogID)) {
        return res.status(400).json({
            message: "missing or invalid blogid"
        })
    }

    const payLoad = {}
    if (title) payLoad.title = title
    if (content) payLoad.content = content
    if (tags) payLoad.tags = tags.split(",")

    try {
        const blogExists = await findBlog(blogID)
        if (!blogExists) {
            return res.status(400).json({
                message: "blog not found!"
            })
        }

        if (user?._id !== blogExists.postedBy.toString()) {
            return res.status(403).json({
                message: "not allowed to edit blog!"
            })
        }

        await editBlogModel(blogID, payLoad)
        return res.status(200).json({
            message: "edit blog success!",
        })
    } catch (error) {
        return res.status(500).json({
            message: "server error!"
        })
    }
}

const likeBlogController = async (req, res) => {
    const { blogID } = req.body
    const user = req.user

    if (!blogID || !mongoose.Types.ObjectId.isValid(blogID)) {
        return res.status(400).json({
            message: "missing or invalid blogid"
        })
    }

    try {
        const userExists = await findUser(user.email)
        if (!userExists) {
            return res.status(400).json({
                message: "user not found!"
            })
        }

        const blogExists = await findBlog(blogID)
        if (!blogExists) {
            return res.status(400).json({
                message: "blog not found!"
            })
        }

        const findLike = await findLikeinDb(user._id, blogID)        
        if (findLike) {
            await likeBlogModel(user._id, blogID, "delete")
            return res.status(200).json({
                message: "blog unliked success!"
            })
        }

        await likeBlogModel(user._id, blogID)
        return res.status(201).json({
            message: "blog liked success!"
        })

    } catch (error) {
        return res.status(500).json({
            message: "server error",
        })
    }
}

const commnetBlogController = async(req,res)=>{
    const { blogID ,comment} = req.body
    const user = req.user

    if(!blogID || !comment){
        return res.status(400).json({
            message: "missing data!"
        })
    }

    if (!mongoose.Types.ObjectId.isValid(blogID)) {
        return res.status(400).json({
            message: "comment or blogId is invalid!"
        })
    }

    try {
        const userExists = await findUser(user.email)
        if (!userExists) {
            return res.status(400).json({
                message: "user not found!"
            })
        }  
        
        const blogExists = await findBlog(blogID)
        if (!blogExists) {
            return res.status(400).json({
                message: "blog not found!"
            })
        }
        await postCommentModel(user._id,blogID,comment)
        return res.status(201).json({
            message: "comment posted success!"
        })
    } catch (error) {
        return res.status(201).json({
            message: "server error!"
        })
    }

}

const allBlogsController = async (req, res) => {
    try {
        const blogs = await allBlogsModel()
        return res.status(200).json({
            data: blogs
        })
    } catch (error) {
        return res.status(500).json({
            message: "server error"
        })
    }
}

const myblogsController = async (req, res) => {
    const user = req.user
    try {
        const myBlogs = await myblogsModel(user)

        return res.status(200).json({
            data: myBlogs
        })
    } catch (error) {
        return res.status(500).json({
            message: "server error!"
        })
    }
}

module.exports = {
    creatBlogController,
    allBlogsController,
    myblogsController,
    editBlogController,
    likeBlogController,
    commnetBlogController
}