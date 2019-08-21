const express = require('express');

const router = express.Router();


router.post('/validate', (req, res, next) => {
  res.json({ str: 'validate' });
});

module.exports = router;
