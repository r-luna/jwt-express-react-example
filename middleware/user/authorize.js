
const { User } = require('../../db/models');

// eslint-disable-next-line arrow-body-style
const authorize = () => {
  return async (req, res, next) => {
    if (res.locals.user.exists) {
      try {
        const person = await User.query().first().where({ email: req.body.email });
        const { username, email, role } = person;
        const passwordIsValid = await person.verifyPassword(req.body.password);
        const userData = {
          authorized: passwordIsValid,
          username,
          email,
          role,
        };
        Object.assign(res.locals.user, userData);
      } catch (err) {
        res.locals.user = { authorized: false, authmessage: err };
      }
    } else {
      res.locals.user.authorized = null;
    }
    next();
  };
};

module.exports = authorize;
