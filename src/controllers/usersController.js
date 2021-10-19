const jwt = require('jsonwebtoken');
const Users = require('../../repository/usersReposyitory');
const { HttpCode, Subscription } = require ('../../config/constants');

require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const registration = async (req, res, next) => {
    const { name, email, password, subscription } = req.body;
    const user = await Users.findByEmail(email);
    if (user) {
        return res
            .status(HttpCode.CONFLICT)
            .json({
            status: 'error',
            code: HttpCode.CONFLICT,
            message: 'Email is already exist',
          });
    }
    try {
        const newUser = await Users.create({ name, email, password, subscription });
        return res
            .status(HttpCode.CREATED)
            .json({
            status: 'success',
            code: HttpCode.CREATED,
            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                subscription: newUser.subscription,
                avatar: newUser.avatar,
            },
          });
    } catch(error) {
        next(error)
    }
};

const logIn = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
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
    await Users.updateToken(id, token);
    return res
            .status(HttpCode.OK)
            .json({
            status: 'success',
            code: HttpCode.OK,
            data: {
                token,
            },
        });
};

const logOut = async (req, res, next) => {
    const id = req.user._id;
    await Users.updateToken(id, null)
    return res.status(HttpCode.NO_CONTENT).json({});
};

const currentUser = async (req, res, next) => {
    try {
        const { email, subscription } = req.user;

        return res
            .status(HttpCode.OK)
            .json({
            status: 'success',
            code: HttpCode.OK,
            data: {
                email,
                subscription,
            },
        });
    } catch (error) {
        next(error);
    }
};

const updateSubscription = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await Users.updateSubscription(req.body, userId);
        if (user) {
          return res.status(HttpCode.OK).json({
            status: "success",
            code: HttpCode.OK,
            user: {
              id: user.userId,
              email: user.email,
              subscription: user.subscription,
            },
          });
        } 
    } catch (error) {
        next(error);
    }
};
  
  const userStarter = async (req, res) => {
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        message: `Enable for ${Subscription.STARTER}`,
      },
    });
  };
  
  const userPro = async (req, res) => {
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        message: `Enable for ${Subscription.PRO}`,
      },
    });
  };
  
  const userBusiness = async (req, res) => {
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        message: `Enable for ${Subscription.BUSINESS}`,
      },
    });
  };

module.exports = {
    registration,
    logIn,
    logOut,
    currentUser,
    updateSubscription,
    userStarter,
    userPro,
    userBusiness,
};