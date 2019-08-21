const { Model } = require('../index');

class User extends Model {
  static get tableName() {
    return 'user';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        username: { type: 'string', minLength: 1, maxLength: 125 },
        email: { type: 'string', minLength: 5, maxLength: 125 },
        password: { type: 'string', minLength: 7, maxLength: 65 },
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
}

module.exports = User;
