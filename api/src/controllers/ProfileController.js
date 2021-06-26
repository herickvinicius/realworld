const User = require("../models/User");
const toDTO = require("../helpers/toDTO");

module.exports = {
  async getProfile(req, res) {
    try {
      const { username } = req.params;
      let profile = await User.findOne({ where: { username } });

      if (!profile) {
        return res.status(404).send({ error: "not found" });
      }

      profile = toDTO.profileDTO(profile);
      return res.status(200).send({ profile });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
};
