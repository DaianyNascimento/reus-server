function isDonor(req, res, next) {

    if (req.session.user.role === 'donor') {
        next();
    } else {
        res.status(401)
        throw new Error('Not authorized as a Donor')
    }
};

module.exports = isDonor;