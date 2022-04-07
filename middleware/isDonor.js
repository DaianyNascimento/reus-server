const isDonor = (req, res, next) => {
    if (req.session.role === 'donor') {
        next()
    } else {
    res.status(401)
    throw new Error('Not authorized as a Donor')
    }
  };

  module.exports = isDonor;