const { Model } = require('../index');
const Password = require('objection-password')();

class User extends Password(Model) {
  static get tableName() {
    return 'user';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['fname', 'lname', 'email', 'role', 'password'],
      properties: {
        fname: { type: 'string', minLength: 1, maxLength: 60 },
        lname: { type: 'string', minLength: 1, maxLength: 60 },
        email: { type: 'string', minLength: 5, maxLength: 125 },
        role: { type: 'string', enum: ['admin', 'employer'] },
        password: { type: 'string', minLength: 3, maxLength: 120 },
      },
    };
  }

  static get fields() {
    return fields;
  }

  static get outputType() {
    return type;
  }

  static get inputType() {
    return inputType;
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }
}

module.exports = User;
