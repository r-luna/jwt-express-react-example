
const dropCookie = () => {
  return async (req, res, next) => {
    const { exists, authorized, jwt } = res.locals.user;
    if (exists && authorized && jwt) {
      try {
        await res.cookie('jwt', jwt, { httpOnly: true, expires: new Date(Date.now() + (60000) * process.env.JWT_EXP) });
      } catch(err) {
        res.locals.user.cookieDropped = false;
      }
      res.locals.user.cookieDropped = true;
    } else {
      res.locals.user.cookieDropped = false;
    }
    next();
  };
};

module.exports = dropCookie;
