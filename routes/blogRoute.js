const express = require("express")
const iaAuth = require("../middlewares/iaAuth")
const { creatBlogController, allBlogsController, myblogsController, editBlogController, likeBlogController, commnetBlogController } = require("../controllers/blogController")
const blogRouter = express.Router()

blogRouter.post("/createBlog",iaAuth,creatBlogController)
blogRouter.post("/editBlog",iaAuth,editBlogController)
blogRouter.post("/likeBlog",iaAuth,likeBlogController)
blogRouter.post("/postComment",iaAuth,commnetBlogController)
blogRouter.get("/allBlogs",allBlogsController)
blogRouter.get("/myBlogs",iaAuth,myblogsController)

module.exports = blogRouter