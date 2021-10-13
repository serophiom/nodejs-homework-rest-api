const Users = require('../../repository/usersRepository');
const { HttpCode } = require ('../../config/constants');

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
    res.json()
};

const logOut = async (req, res, next) => {
    res.json()
};

module.exports = {
    registration,
    logIn,
    logOut,
};