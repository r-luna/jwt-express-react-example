const express = require('express');
const { jwtVerify, jwtDecode } = require('../../middleware');

const router = express.Router();

router.post('/verify', jwtVerify(), (req, res, next) => {
  let response;
  if (res.locals.user.jwtVerified) {
    const { jwtVerified: claims } = res.locals.user;
    res.status(200);
    response = {
      status: 'success',
      message: 'JWT Verified',
      claims,
    };
  } else {
    const { jwtVerified, ...rest } = res.locals.user;
    res.status(401);
    response = { status: 'failure', ...rest };
  }
  res.json(response);

  res.end();
});

module.exports = router;
