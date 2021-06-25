const User = require("../models/User");

module.exports = {
  async getProfile(req, res) {
    try {
      const { username } = req.params;
      const profile = await User.findOne({ where: { username } });

      if (!profile) {
        return res.status(404).send({ error: "not found" });
      }

      return res.status(200).send({ profile });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
};
