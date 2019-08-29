
const jwt = require('jsonwebtoken');

// eslint-disable-next-line arrow-body-style
const jwtSign = () => {
  return (req, res, next) => {
    const { exists, authorized } = res.locals.user;
    if (exists && authorized) {
      const { fname, lname, email, role } = res.locals.user;
      const payloadWithClaims = {
        fname,
        lname,
        email,
        role,
        exp: Math.floor(Date.now() + (1000 * (60 * process.env.JWT_EXP))),
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

const jwtVerify = () => {
  return async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      const claims = {
        alg: process.env.JWT_ALGO, // algorithm
        typ: 'JWT',
      };
      try {
        res.locals.user = { jwtVerified: await jwt.verify(token, process.env.JWT_KEY, claims), jwt: token }; // decoded, null if invalid
      } catch (err){
        res.locals.user = { jwtVerified: false, error: { ...err } };
      }
    } else {
      res.locals.user = { jwtVerified: false };
    }
    next();
  }
};


const jwtDecode = token => jwt.decode(token, { complete: true });

module.exports = { jwtSign, jwtVerify, jwtDecode };
