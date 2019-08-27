
const jwt = require('jsonwebtoken');

// eslint-disable-next-line arrow-body-style
const jwtSign = () => {
  return (req, res, next) => {
    const { exists, authorized } = res.locals.user;
    if (exists && authorized) {
      const { username, email, role } = res.locals.user;
      const payloadWithClaims = {
        username,
        email,
        role,
        exp: Math.floor(Date.now() / 1000) + (60 * process.env.JWT_EXP),
        iat: Date.now(),
        alg: process.env.JWT_ALGO, // algorithm
        typ: 'JWT',
      };
      const signed = jwt.sign(payloadWithClaims, process.env.JWT_KEY); // token
      res.locals.user.jwt = signed;
    } else {
      res.locals.user.jwt = null;
    }
    next();
  };
};

const jwtVerify = (token) => {
  const claims = {
    alg: process.env.JWT_ALGO, // algorithm
    typ: 'JWT',
  };
  try {
    return jwt.verify(token, process.env.JWT_KEY, claims); // decoded, null if invalid
  } catch (e) {
    return e;
  }
};

const jwtDecode = token => jwt.decode(token, { complete: true });

module.exports = { jwtSign, jwtVerify, jwtDecode };
