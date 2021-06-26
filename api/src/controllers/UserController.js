const User = require("../models/User");
const bcrypt = require("bcryptjs");
const toDTO = require("../helpers/toDTO");

module.exports = {
  async getCurrentUser(req, res) {
    const userId = req.userId;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).send({ error: error.message });
      }

      return res.status(200).send(toDTO.userDTO(user));
    } catch (error) {
      return res.status(500).send({ error: error.message });
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
      return res.status(500).send({ error: error.message });
    }
  },

  async update(req, res) {
    const { email, username, bio, image } = req.body.user;
    let { password } = req.body.user;
    const userId = req.userId;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).send({ error: "NOT FOUND" });
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
      return res.status(500).send({ error: error.message });
    }
  },
};
