const User = require("../models/User");
const toDTO = require("../helpers/toDTO");
const errors = require("../helpers/errors");

module.exports = {
  async getProfile(req, res) {
    try {
      const { username } = req.params;
      let profile = await User.findOne({ where: { username } });

      if (!profile) {
        errors.notFoundResponse(res);
      }

      profile = toDTO.profileDTO(profile);
      return res.status(200).send({ profile });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  async getProfileByPk(userId) {
    try {
      const profile = await User.findByPk(userId);
      if (!profile) {
        errors.notFoundResponse(res);
      }

      return toDTO.profileDTO(profile);
    } catch (error) {}
  },
};
