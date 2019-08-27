
const { User } = require('../../db/models');

// eslint-disable-next-line arrow-body-style
const exists = () => {
  return async (req, res, next) => {
    const graph = req.body;
    try {
      await User.query().findOne(
        {
          email: graph.email,
        },
      ).then( async (data) => {
        if (data === undefined) {
          res.locals.user = {
            exists: false,
          };
        } else {
          res.locals.user = {
            exists: true,
          };
        }
      });
    } catch (err) {
      res.locals.user = {
        exists: false,
        message: `Field [${Object.keys(err.data)[0]}] ${err.data[Object.keys(err.data)[0]][0].message}`,
      };
    }

    next();
  };
};

module.exports = exists;
