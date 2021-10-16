const jwt = require('jsonwebtoken');
const Users = require('../../repository/usersRepository');
const { HttpCode } = require ('../../config/constants');

require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const registration = async (req, res, next) => {
    const {name, email, password, gender} = req.body;
    const user = await Users.findByemail(email);
    if (user) {
        return res
            .status(HttpCode.CONFLICT)
            .json({
            status: 'error',
            code: HttpCode.CONFLICT,
            message: 'Email is already exist',
          })
    }
    try {
        const newUser = await Users.create({name, email, password, gender})
        return res
            .status(HttpCode.CREATED)
            .json({
            status: 'success',
            code: HttpCode.CREATED,
            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                gender: newUser.gender,
            },
          })
    } catch(error) {
        next(error)
    }
};

const logIn = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await Users.findByemail(email);
    const isValidPassword = await user.isValidPassword(password);
    if (!user || !isValidPassword) {
        return res
            .status(HttpCode.UNAUTHORIZED)
            .json({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: 'Invalid credentials',
        })
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
    await Users.updateToken(id, token)
    return res
            .status(HttpCode.OK)
            .json({
            status: 'success',
            code: HttpCode.OK,
            data: {
                token,
            },
        })
};

const logOut = async (req, res, next) => {
    const id = req.user._id;
    await Users.updateToken(id, null)
    return res.status(HttpCode.NO_CONTENT).json({});
};

module.exports = {
    registration,
    logIn,
    logOut,
};