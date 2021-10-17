const express = require('express');
const router = express.Router();

const {
    registration,
    logIn,
    logOut,
} = require('../../controllers/usersController');
const guard = require('../../../helpers/guard');
const loginLimit = require('../../../helpers/rate-limit-login');

router.post('/registration', registration);
router.post('/logIn', loginLimit, logIn);
router.post('/logOut', guard, logOut);

module.exports = router;