const { transaction } = require('objection');
const express = require('express');
const { User } = require('../../db/models');

const router = express.Router();


router.post('/create', async (req, res, next) => {
  const graph = req.body;
  let insertedGraph = null;

  // does user exist?
  const prevUser = User.query().findOne(
    {
      email: graph.email,
    },
  ).then(async (data) => {
    if (data === undefined) {
      try {
        insertedGraph = await transaction(User.knex(), trx => {
          return (
            User.query(trx)
              .allowInsert('[username, email, password]')
              .insertGraph(graph)
          );
        });
      } catch (err) {
        const reply = {
          success: false,
          message: `Field [${Object.keys(err.data)[0]}] ${err.data[Object.keys(err.data)[0]][0].message}`,
        };
        res.status(err.statusCode || 500).json(reply);
      }
      res.status(200).json({ success: true, message: 'Insert success' });
    } else {
      res.status(400).json({ success: false, message: 'User with this email address already exists.'});
    }
  });
});

module.exports = router;
