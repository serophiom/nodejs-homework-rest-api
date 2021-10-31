const jwt = require('jsonwebtoken');
const fs = require('fs/promises');
const Users = require('../../repository/usersReposyitory');
const UploadService = require('../../sevices/cloud-upload');
const { HttpCode, Subscription } = require ('../../config/constants');
const EmailService = require('../../sevices/email/service');
const { CreateSenderSendGrid, CreateSenderNodemailer } = require('../../sevices/email/sender');

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
    // TOD: Send email for verify user

    const newUser = await Users.create({ name, email, password, subscription });
    const emailService = new EmailService(
      process.env.NODE_ENV,
      // new CreateSenderNodemailer(),
      new CreateSenderSendGrid(),
    )
    const statusEmail = await emailService.sendVerifyEmail(
      newUser.email,
      newUser.name,
      newUser.verifyToken
    );
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
          avatarURL: newUser.avatarURL,
          successEmail: statusEmail,
        },
      });
    } catch(error) {
        next(error)
    }
};

const logIn = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);
    if (!user || !isValidPassword || !user?.isVerified) {
        return res
            .status(HttpCode.UNAUTHORIZED)
            .json({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: 'Invalid credentials',
        });
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
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

// const uploadAvatar = async (req, res, next) => {
//   const id = String(req.user._id);
//   const file = req.file;
//   const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS;
//   const destination = path.join(AVATAR_OF_USERS, id);
//   await mkdirp(destination);
//   const uploadService = new UploadService(destination);
//   const avatarUrl = await uploadService.save(file, id);
//   await Users.updateAvatar(id, avatarUrl);
 
//   return res.status(HttpCode.OK).json({
//     status: 'success',
//     code: HttpCode.OK,
//     data: {
//       avatar: avatarUrl,
//     },
//   });
// };

const uploadAvatar = async (req, res, next) => {
  const { id, idUserCloud } = req.user;
  const file = req.file;
  const destination = 'Avatars'
  const uploadService = new UploadService(destination);
  const { avatarUrl, returnIdCloudUser } = await uploadService.save(file.path, idUserCloud);
  await Users.updateAvatar(id, avatarUrl, returnIdCloudUser);
  try {
    await fs.unlink(file.path)
  } catch(error) {
    console.log(error.message);
  }
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      avatar: avatarUrl,
    },
  });
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

const verifyUser = async (req, res, next) => {
    const user = await Users.findUserByVerifyToken(req.params.verificationToken);
    if (user) {
      await Users.updateTokenVerify(user._id, true, null);
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          message: 'Success',
        },
      });
    }
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'Invalid token',
    });
};

const repeatEmailForVerifyUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    const { email, name, verifyToken } = user;
    const emailService = new EmailService(
      process.env.NODE_ENV,
      // new CreateSenderSendGrid(),
      new CreateSenderNodemailer(),
    )
    await emailService.sendVerifyEmail(
      email,
      name,
      verifyToken,
    )
  }
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: {
      message: 'Verification email is send',
    },
  }); 
};

module.exports = {
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
};