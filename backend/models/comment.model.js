const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    content: {
        type: String,
        requuired: true
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: 'blogs',
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, { timestamps: true });

const CommentModel = model('comments', commentSchema);

module.exports = CommentModel;