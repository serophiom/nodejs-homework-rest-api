module.exports = {
    v2: {
        config: () => {},
        uploader: {
            upload: (a,b, callback) =>
            callback(null, { public_id: '12345', secure_url: 'http://geg.com' }),
        },
    },
};