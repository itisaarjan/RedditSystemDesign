const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subredditSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Remove whitespace from the beginning and end
    },
    description: {
        type: String,
        default: '',
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
    subscribers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Subreddit', subredditSchema);
