
const { HttpCode } = require ('../../config/constants');

const role = (role) => (req, res, next) => {

    const roleUser = req.user.gender

        if (roleUser !== role) {
            return res
            .status(HttpCode.FORBIDDEN)
            .json({
                status: 'error',
                code: HttpCode.FORBIDDEN,
                message: 'Access is denied',
            })
        }
        return next();
};

nodule.exports = role;