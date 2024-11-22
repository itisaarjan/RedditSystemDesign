const Post = require('../model/post');
const User = require('../model/user');

const createUserPost = async (req, res) => {
    try {
        console.log('User from Middleware:', req.user); // Log the user object
        const { title, body, subreddit } = req.body;

        if (!req.user || !req.user.username) {
            return res.status(400).json({ error: 'Invalid user session' });
        }

        const post = new Post({
            title,
            body,
            subreddit,
            author: req.user.id,
        });

        await post.save();
        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        console.error('Error in createUserPost:', error.message);
        res.status(500).json({ error: 'Error creating post' });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        .populate('author', 'username')
        .populate('subreddit', 'name') // Add 'name' or any other field you need
        .sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
};

const upvotePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        post.addUpvote(req.user.id);
        await post.save();

        res.status(200).json({ message: 'Post upvoted successfully', post });
    } catch (error) {
        console.error('Error upvoting post:', error.message);
        res.status(500).json({ error: 'Error upvoting post' });
    }
};

const downvotePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        post.addDownvote(req.user.id);
        await post.save();

        res.status(200).json({ message: 'Post downvoted successfully', post });
    } catch (error) {
        console.error('Error downvoting post:', error.message);
        res.status(500).json({ error: 'Error downvoting post' });
    }
};

const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const newComment = {
            user: req.user.id,
            body: comment,
        };

        post.comments.push(newComment);
        await post.save();

        // Populate the user field in the newly added comment
        const populatedComment = await post.populate('comments.user', 'username');

        res.status(201).json({
            message: 'Comment added successfully',
            comment: populatedComment.comments[populatedComment.comments.length - 1], // Return the last added comment
        });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Error adding comment' });
    }
};

const getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user.id })
            .select('title body subreddit upvotes downvotes createdAt') 
            .populate('author', 'username') 
            .sort({ createdAt: -1 });

        const formattedPosts = posts.map((post) => ({
            ...post._doc,
            upvoteCount: post.upvotes.length,
            downvoteCount: post.downvotes.length,
        }));

        res.status(200).json(formattedPosts);
    } catch (error) {
        console.error('Error fetching user posts:', error.message);
        res.status(500).json({ error: 'Error fetching your posts' });
    }
};


module.exports = { createUserPost, getAllPosts, upvotePost, addComment,getUserPosts,downvotePost };