function isDonee(req, res, next) {
    if (req.session.user.role === 'donee') {
        next()
    } else {
    res.status(401)
    throw new Error('Not authorized as a Donee')
    }
  };

  module.exports = isDonee; 