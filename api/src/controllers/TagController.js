const Tag = require("../models/Tag");
const toDTO = require("../helpers/toDTO");

module.exports = {
  async getTags(req, res) {
    try {
      const tags = await Tag.findAll();

      return res.status(200).send({ tags: toDTO.tagDTO(tags) });
    } catch (error) {
      errors.unhandledResponse(res, error.message);
    }
  },

  async create(data) {
    try {
      const [tag] = await Tag.findOrCreate({ where: { name: data } });
      return tag;
    } catch (error) {
      errors.unhandledResponse(res, error.message);
    }
  },
};
