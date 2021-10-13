const express = require('express');
const router = express.Router();

const {
    registration,
    logIn,
    logOut,
} = require('../../controllers/usersController');

router.post('/registration', registration);
router.post('/logIn', logIn);
router.post('/logOut', logOut);

module.exports = router;