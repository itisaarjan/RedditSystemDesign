const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
    subscribedSubreddits: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Subreddit',
        },
    ],
    upvotedPosts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
});

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(this.password, salt);
        this.password = hashedpassword;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.post('save', async function (doc, next) {
    try {
        console.log("User has been created successfully");
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
