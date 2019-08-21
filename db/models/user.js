const { Model } = require('../index');
const Password = require('objection-password')();

class User extends Password(Model) {
  static get tableName() {
    return 'user';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'email', 'role', 'password'],
      properties: {
        username: { type: 'string', minLength: 1, maxLength: 125 },
        email: { type: 'string', minLength: 5, maxLength: 125 },
        role: { type: 'string', enum: ['admin', 'user'] },
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
