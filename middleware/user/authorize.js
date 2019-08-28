const { User } = require('../../db/models');
const bcrypt = require('bcrypt');

// eslint-disable-next-line arrow-body-style
const authorize = () => {
  return async (req, res, next) => {
    if (res.locals.user.exists) {
      try {
        const person = await User.query().first().where({ email: req.body.email });
        const { fname, lname, email, role, password: hash } = person;
        const passwordIsValid = await bcrypt.compareSync(req.body.password, hash);
        const userData = {
          authorized: passwordIsValid,
          fname,
          lname,
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
