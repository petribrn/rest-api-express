"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      name: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Name must be 3 to 255 characters long.',
          },
        },
      },
      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        unique: {
          msg: 'E-mail already exists.',
        },
        validate: {
          isEmail: {
            msg: 'Invalid e-mail.',
          },
        },
      },
      password_hash: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },
      password: {
        type: _sequelize2.default.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'Password must be 6 to 50 characters long.',
          },
        },
      },
    }, { sequelize });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        const salt = await _bcryptjs2.default.genSalt(8);
        user.password_hash = await _bcryptjs2.default.hash(user.password, salt);
      }
    });

    return this;
  }

  passwordCheck(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
} exports.default = User;
