const User = require("../models/User");
const bcrypt = require("bcryptjs");
const toDTO = require("../helpers/toDTO");
const errors = require("../helpers/errors");

module.exports = {
  async getCurrentUser(req, res) {
    const userId = req.userId;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        errors.notFoundResponse(res);
      }

      return res.status(200).send(toDTO.userDTO(user));
    } catch (error) {
      errors.unhandledResponse(res, error.message);
    }
  },

  async create(req, res, next) {
    const { username, email, password } = req.body.user;

    try {
      await User.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
      });

      next();
    } catch (error) {
      errors.unhandledResponse(res, error.message);
    }
  },

  async update(req, res) {
    const { email, username, bio, image } = req.body.user;
    let { password } = req.body.user;
    const userId = req.userId;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        errors.notFoundResponse(res);
      }
      if (password) {
        password = await bcrypt.hash(password, 10);
      }

      const updatedUser = await user.update({
        email,
        username,
        password,
        bio,
        image,
      });
      return res.status(200).send({ user: updatedUser });
    } catch (error) {
      errors.unhandledResponse(res, error.message);
    }
  },
};
