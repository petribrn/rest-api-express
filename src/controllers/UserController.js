import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);

      const { id, name, email } = newUser;
      return res.json({ id, name, email });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((e) => e.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
      return res.json(users);
    } catch (error) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      const { id, name, email } = user;
      return res.json({ id, name, email });
    } catch (error) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          errors: ['User not found.'],
        });
      }

      const newUserData = await user.update(req.body);

      const { id, name, email } = newUserData;
      return res.json({ id, name, email });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((e) => e.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          errors: ['User not found.'],
        });
      }

      await user.destroy();

      return res.json(null);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((e) => e.message),
      });
    }
  }
}

export default new UserController();

/*
index -> list all - GET
store/create ->  create new - POST
delete -> delete one - DELETE
show -> show one - GET
update -> updates one - PATCH (only one attribute) or PUT (full object)
*/
