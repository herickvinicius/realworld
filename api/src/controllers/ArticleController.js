const Article = require("../models/Article");
const Tag = require("../models/Tag");

module.exports = {
  async getBySlug(req, res) {
    const { slug } = req.params;
    try {
      const article = await Article.findOne({ where: { slug } });

      if (!article) {
        return res.status(404).send({ error: error.message });
      }

      return res.status(200).send({ article });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  async create(req, res) {
    const { title, description, body, tagList } = req.body.article;
    const author = req.userId;
    const slug = title.split(" ").join("-").toLowerCase();
    try {
      const article = await Article.create({
        slug,
        title,
        description,
        body,
        author,
      });

      const promiseArray = tagList.map((tag) =>
        Tag.findOrCreate({ where: { name: tag } })
      );
      await Promise.all(promiseArray);

      return res.status(200).send({ article });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
};
