const { Model } = require('objection');
const Knex = require('knex');

const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];

// Initialize knex.
const knex = Knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: `${__dirname}/dev.sqlite3`,
  },
});

// Give the knex object to objection.
Model.knex(knex);

module.exports = {
  knex,
  Model,
};
