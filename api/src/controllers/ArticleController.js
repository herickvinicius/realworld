const Article = require("../models/Article");
const Tag = require("../models/Tag");
const toDTO = require("../helpers/toDTO");

module.exports = {
  async getBySlug(req, res) {
    const { slug } = req.params;
    try {
      let article = await Article.findOne({
        where: { slug },
      });

      tagList = await Tag.findAll({
        where: {},
      });

      if (!article) {
        return res.status(404).send({ error: "not found" });
      }

      article = toDTO.articleDTO(article);
      return res.status(200).send({ article });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  async create(req, res) {
    const { title, description, body, tagList } = req.body.article;
    const author = req.userId;
    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
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

  async update(req, res) {
    const { title, description, body } = req.body.article;
    let { slug } = req.params;
    const userId = req.userId;

    try {
      const article = await Article.findOne({ where: { slug } });
      if (!article) {
        return res.status(404).send({ error: "Not found" });
      }

      if (article.author != userId) {
        return res.status(403).send({ error: "Unauthorized" });
      }

      if (title) {
        slug = title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");
      }

      const updatedArticle = await article.update({
        slug,
        title,
        description,
        body,
      });
      return res.status(200).send({ article: updatedArticle });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  async delete(req, res) {
    const { slug } = req.params;
    const userId = req.userId;

    try {
      const article = await Article.findOne({ where: { slug } });

      if (!article) {
        return res.status(404).send({ error: "Not found" });
      }

      if (article.author != userId) {
        return res.status(403).send({ error: "Unauthorized" });
      }

      await article.destroy({ where: { slug } });
      res.status(200).send({});
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
};
