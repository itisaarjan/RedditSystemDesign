const express = require('express');
const { signup_post, login_post, protected_route } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup_post);
router.post('/login', login_post);
router.get('/protected', protected_route);

module.exports = router;
