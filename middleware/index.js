const exists = require('./user/exists');
const authorize = require('./user/authorize');
const dropCookie = require('./user/dropCookie');
const { jwtSign, jwtVerify, jwtDecode } = require('./user/jwt');

module.exports = {
  exists,
  authorize,
  dropCookie,
  jwtSign,
  jwtVerify,
  jwtDecode,
};
