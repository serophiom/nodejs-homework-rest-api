const express = require('express');
const router = express.Router();

const {
    registration,
    logIn,
    logOut,
} = require('../../controllers/usersController');
const guard = require('../../../helpers/guard');

router.post('/registration', registration);
router.post('/logIn', logIn);
router.post('/logOut', guard, logOut);

module.exports = router;