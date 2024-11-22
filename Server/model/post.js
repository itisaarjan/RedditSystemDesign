const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    subreddit: {
        type: Schema.Types.ObjectId,
        ref: 'Subreddit', // Reference Subreddit schema
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    upvotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    downvotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            body: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    upvoteCount: {
        type: Number,
        default: 0,
    },
    downvoteCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    subreddit: {
    type: Schema.Types.ObjectId,
    ref: 'Subreddit', // Reference the Subreddit model
    required: true,
}
});


postSchema.methods.addUpvote = function (userId) {
    if (!this.upvotes.includes(userId)) {
        this.upvotes.push(userId);
        this.downvotes = this.downvotes.filter((id) => id.toString() !== userId.toString());
        this.upvoteCount = this.upvotes.length;
        this.downvoteCount = this.downvotes.length;
    }
};

postSchema.methods.addDownvote = function (userId) {
    if (!this.downvotes.includes(userId)) {
        this.downvotes.push(userId);
        this.upvotes = this.upvotes.filter((id) => id.toString() !== userId.toString());
        this.upvoteCount = this.upvotes.length;
        this.downvoteCount = this.downvotes.length;
    }
};

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
