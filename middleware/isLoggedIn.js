const isLoggedIn = (req, res, next) => {
    if (req.session.user) {
      return next();
    }
    return res
      .status(401)
      .json({ errorMessage: "User has to be logged in to view this page" });
  };
  
  module.exports = isLoggedIn;