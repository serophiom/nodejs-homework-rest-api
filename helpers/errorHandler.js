const wrapper = (fn) => async (req, res, next) => {
    try {
        const result = await fn(req, res, next);
        return result;
    } catch (error) {
        switch (error.name) {
            case 'ValidationError':
               return res
              .status(400)
              .json({ status: 'error', code: 400, message: error.message });
            break
            case 'CustomError':
               return res
              .status(error.status)
              .json({ status: 'error', code: error.status, message: error.message });
            break
            default:
                next(error);
                breake;
        }
    }
};

module.exports = wrapper;