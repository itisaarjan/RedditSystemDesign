const User = require('../model/user');

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate('upvotedPosts')
            .populate('posts')
            .populate({
                path: 'upvotedPosts',
                populate: { path: 'author', select: 'username' },
            });
        res.status(200).json({
            username: user.username,
            email: user.email,
            subscribedSubreddits: user.subscribedSubreddits,
            upvotedPosts: user.upvotedPosts,
            posts: user.posts,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user profile' });
    }
};

module.exports = { getUserProfile };