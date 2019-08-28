/* eslint-disable func-names */

exports.up = (knex) => {
  return knex.schema.createTable('user', (table) => {
    table.increments('id').primary();
    table.string('fname');
    table.string('lname');
    table.string('email');
    table.string('role');
    table.string('password');
    table.timestamps();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('user');
};
