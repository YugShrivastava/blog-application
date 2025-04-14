const CommentModel = require('../models/comment.model');

const addComment = async (req, res) => {
    try {
        const { content, createdBy, blogId } = req.body.comment;

        console.log({ content, createdBy, blogId });

        if(!content.trim() || !createdBy.trim() || !blogId.trim()) return res.status(400).json({error: true, message: 'missing fields'})
        const comment = await CommentModel.create({
            content, createdBy, blogId
        });

        if (!comment) return res.status(500).json({ error: true, message: 'Internal server error' });
        return res.status(201).json({ message: 'comment sucessfully added' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, message: 'Internal server error' });
    }
}

const getAllComments = async (req, res) => {
    try {
        const blogId = req.headers.blogid;
        console.log({blogId});
    
        const comments = await CommentModel.find({
            blogId
        }).populate('createdBy');
    
        if (comments.length === 0) return res.status(200).json({ message: 'no comments yet' });
        return res.status(200).json({ comments });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, message: 'Internal server error' });
    }

}

module.exports = {
    addComment,
    getAllComments
}