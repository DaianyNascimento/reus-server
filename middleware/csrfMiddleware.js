const csrf = require("csurf");

const csrfMiddleware = csrf();

module.exports = csrfMiddleware;