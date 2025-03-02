const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, (req, res) => {
    res.json(req.user);
});

module.exports = router;
