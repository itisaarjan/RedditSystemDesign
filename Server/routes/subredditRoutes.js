const express = require('express');
const { getSubredditByName, createSubreddit } = require('../controllers/subredditController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Fetch subreddit by name
router.get('/', authenticate, getSubredditByName);

// Create a new subreddit
router.post('/', authenticate, createSubreddit);

module.exports = router;
