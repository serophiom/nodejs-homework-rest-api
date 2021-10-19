const express = require('express');
const router = express.Router();
const {
    validateUserRegistration,
    validateUserLogIn,
    validateSubscriptionUser,
} = require('./validation');

const {
    registration,
    logIn,
    logOut,
    currentUser,
    updateSubscription,
    userStarter,
    userPro,
    userBusiness,
} = require('../../controllers/usersController');
const guard = require('../../../helpers/guard');
const loginLimit = require('../../../helpers/rate-limit-login');
const { Subscription } = require('../../../config/constants');
const role = require('../../../helpers/role');

router.patch('/', guard, validateSubscriptionUser, updateSubscription);
router.get('/starter', guard, role(Subscription.STARTER), userStarter);
router.get('/pro', guard, role(Subscription.PRO), userPro);
router.get('/business', guard, role(Subscription.BUSINESS), userBusiness);
router.post('/registration', validateUserRegistration, registration);
router.post('/logIn', loginLimit, validateUserLogIn, logIn);
router.post('/logOut', guard, logOut);
router.get('/current', guard, currentUser);
router.patch('/public/avatars', guard, () => {});

module.exports = router;