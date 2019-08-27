const express = require('express');
const {
  exists,
  authorize,
  dropCookie,
  jwtSign,
} = require('../../middleware');

const router = express.Router();

// validate user and issue a JWT via an httponly cookie
router.post('/login', exists(), authorize(), jwtSign(), dropCookie(), (req, res, next) => {
  let response;
  if (res.locals.user.cookieDropped) {
    const { username, email, role, jwt } = res.locals.user;
    res.status(200);
    response = {
      status: 'success',
      message: 'Login Success',
      user: {
        username,
        email,
        role,
        jwt
      },
    };
  } else {
    res.status(401);
    response = { status: 'failure', message: 'Unauthorized' };
  }
  res.json(response);
});

module.exports = router;
