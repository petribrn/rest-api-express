import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Name must be 3 to 255 characters long.',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
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
        const salt = await bcryptjs.genSalt(8);
        user.password_hash = await bcryptjs.hash(user.password, salt);
      }
    });

    return this;
  }

  passwordCheck(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
