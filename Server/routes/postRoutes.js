const express = require('express');
const { downvotePost,createUserPost, upvotePost, addComment, getAllPosts,getUserPosts } = require('../controllers/postController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createUserPost);
router.post('/:id/upvote', authenticate, upvotePost);
router.post('/:id/comment', authenticate, addComment);
router.get('/', getAllPosts);
router.get('/my-posts', authenticate, getUserPosts); 
router.post('/:id/downvote', authenticate, downvotePost);



module.exports = router;
