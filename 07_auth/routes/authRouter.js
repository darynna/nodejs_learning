const { Router } = require('express');

const { authMiddleware } = require('../middlewares');
const { authController } = require('../controllers');

// const router = Router();

// router.post('/signup', authMiddleware.checkSignupData, authController.signup);
// router.post('/login', authMiddleware.checkLoginData, authController.login);

// module.exports = router;

const router = Router();

router.post('./signup', authMiddleware.checkSignupData, authController.signup);
router.post('./login', authMiddleware.checkLoginData);

// PASSWORD RESTORE;
// 1. send restore password instruction via email
// router.post('/forgot-password)

// 2. update use password (with temporary token)
// router.post(/restore-password)

module.exports = router;
