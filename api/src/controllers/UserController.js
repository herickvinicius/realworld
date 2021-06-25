const User = require("../models/User");
const bcrypt = require("bcryptjs");

// TO DO: provide userId by JWT.
module.exports = {
  async getUser(req, res) {
    const { userId } = req.params;
    const user = await User.findByPk(userId, {
      attributes: ["email", "username", "bio", "image"],
    });

    if (!user) {
      return res.status(404).send({ error: error.message });
    }

    return res.status(200).send({ user });
  },

  async create(req, res, next) {
    const { username, email, password } = req.body.user;

    try {
      const createdUser = await User.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
      });

      next();
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  // TO DO: provide userId by JWT.
  async update(req, res) {
    const { email, password, bio, image } = req.body.user;
    const { userId } = req.params;

    console.log(email, password, bio, image);
    console.log(userId);

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).send({ error: "NOT FOUND" });
      }

      const updatedUser = await user.update({
        email,
        password,
        bio,
        image,
      });
      return res.status(200).send({ updatedUser });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
};
