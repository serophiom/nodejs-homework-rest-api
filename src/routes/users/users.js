const express = require('express');
const router = express.Router();
const {
    validateUserRegistration,
    validateUserLogIn,
    validateSubscriptionUser,
    validateRepeatEmailForVerifyUser
} = require('./validation');

const {
    registration,
    logIn,
    logOut,
    uploadAvatar,
    currentUser,
    updateSubscription,
    userStarter,
    userPro,
    userBusiness,
    verifyUser,
    repeatEmailForVerifyUser,
} = require('../../controllers/usersController');
const guard = require('../../../helpers/guard');
const loginLimit = require('../../../helpers/rate-limit-login');
const { Subscription } = require('../../../config/constants');
const role = require('../../../helpers/role');
const upload = require('../../../helpers/uploads');

router.patch('/', guard, validateSubscriptionUser, updateSubscription);
router.get('/starter', guard, role(Subscription.STARTER), userStarter);
router.get('/pro', guard, role(Subscription.PRO), userPro);
router.get('/business', guard, role(Subscription.BUSINESS), userBusiness);
router.post('/registration', validateUserRegistration, registration);
router.post('/login', loginLimit, validateUserLogIn, logIn);
router.post('/logout', guard, logOut);
router.get('/current', guard, currentUser);
router.patch('/avatar', guard, upload.single('avatarURL'), uploadAvatar);

router.get('/verify/:verificationToken', verifyUser);
router.post('/verify', validateRepeatEmailForVerifyUser, repeatEmailForVerifyUser);

module.exports = router;