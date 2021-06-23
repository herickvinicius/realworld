const User = require("../models/User");

module.exports = {
  async getProfile(req, res) {
    const { username } = req.params;
    const profile = await User.findOne({ where: { username } });

    if (!profile) {
      return res.status(404).send({ error: error.message });
    }

    return res.status(200).send({ profile });
  },
};
