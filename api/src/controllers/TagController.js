const Tag = require("../models/Tag");
const toDTO = require("../helpers/toDTO");

module.exports = {
  async getTags(req, res) {
    try {
      const tags = await Tag.findAll();

      return res.status(200).send({ tags: toDTO.tagDTO(tags) });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
};
