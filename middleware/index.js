const exists = require('./user/exists');
const authorize = require('./user/authorize');
const dropCookie = require('./user/dropCookie');

module.exports = { exists, authorize, dropCookie };
