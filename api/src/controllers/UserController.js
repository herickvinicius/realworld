const User = require("../models/User");

module.exports = {
  async list(req, res) {
    const { userId } = req.params;
    const user = await User.findByPk(userId, {
      attributes: ["email", "username", "bio", "image"],
    });

    if (!user) {
      return res.status(404).send({ error: error.message });
    }

    return res.status(200).send({ user });
  },

  async create(req, res) {
    const { username, email, password } = req.body.user;
    console.log(req.body);

    try {
      const user = await User.create({
        username,
        email,
        password,
      });

      return res.status(200).send({ user });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ error: error.message });
    }
  },
};
