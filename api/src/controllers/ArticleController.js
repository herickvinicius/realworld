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
    const author = 1;
    const slug = "test-slug";
    try {
      const article = await Article.create({
        slug,
        title,
        description,
        body,
        author,
      });

      const promiseArray = tagList.map((tag) =>
        Tag.findOrCreate({ where: { tag } })
      );
      const promiseResolved = await Promise.all(promiseArray);
      promiseResolved.map((tag) => console.log("Valor resolvido:", tag));

      return res.status(200).send({ OK });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ error: error.message });
    }
  },
};
