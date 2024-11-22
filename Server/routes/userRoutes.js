const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const { createUserPost } = require('../controllers/postController'); // Ensure this is correct
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile', authenticate, getUserProfile);
router.post('/profile/posts', authenticate, createUserPost); // Ensure createUserPost is defined

module.exports = router;
