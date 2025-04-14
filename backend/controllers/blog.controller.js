const BlogModel = require('../models/blog.model');

async function addBlog(req, res) {
    const blog = req.body.blog;
    console.log(blog);

    try {
        const entry = await BlogModel.create({
            title: blog.title,
            body: blog.body,
            createdBy: blog.id
        })

        console.log('blog added successfully');
        return res.status(201).json({message: 'blog created successfully', id: entry._id})

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, message: 'error while creating blog' });
    }
}

async function getBlogWithId(req, res) {
    const blogId = req.headers.blogid;
    try {
        const blog = await BlogModel.findById(blogId).populate('createdBy');
        if (!blog?.title) {
            console.log('blog not found');
            return res.status(404).json({error: true, message: 'blog not found'})
        }

        console.log(blog)
        return res.status(200).json(blog);
    } catch (error) {
        console.log(error);
        return res.status(404).json({error: true, message: 'blog not found'})
    }
}

async function getAllBlogs(req, res) {
    try {
        const blogs = await BlogModel.find({})
        if (blogs.length === 0) {
            console.log('no blogs in the database');
            return res.status(404).json({error: true, message: 'no blog recorded yet'})
        }

        return res.status(200).json(blogs);
    } catch (error) {
        console.log(error);
        return res.status(404).json({error: true, message: 'blogs not found'})
    }
}

module.exports = {
    addBlog,
    getBlogWithId,
    getAllBlogs
}