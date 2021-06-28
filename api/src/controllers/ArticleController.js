const Article = require("../models/Article");
const TagController = require("./TagController");
const ProfileController = require("./ProfileController");
const toDTO = require("../helpers/toDTO");
const errors = require("../helpers/errors");

module.exports = {
  async getBySlug(req, res) {
    const { slug } = req.params;
    try {
      let article = await Article.findOne({
        where: { slug },
        include: [{ association: "tagList" }, { association: "authorName" }],
      });

      if (!article) {
        errors.notFoundResponse(res);
      }

      article.tagList = article.tagList.map((Tag) => {
        return Tag.dataValues.name;
      });
      return res.status(200).send({ article: toDTO.articleDTO(article) });
    } catch (error) {
      errors.unhandledResponse(res, error.message);
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
      let article = await Article.create({
        slug,
        title,
        description,
        body,
        author,
      });

      const tagsPromise = tagList.map((tag) => TagController.create(tag));
      const tagsResolved = await Promise.all(tagsPromise);
      const ids = tagsResolved.map((Tag) => Tag.id);

      const tagListPromise = ids.map((id) => article.addTagList(id));
      let tagListResolved = await Promise.all(tagListPromise);
      article.tagList = tagListResolved.flat();

      article.tagList = tagsResolved.map((articleTags) => {
        return articleTags.dataValues.name;
      });

      article.authorName = await ProfileController.getProfileByPk(
        article.author
      );

      return res.status(200).send({ article: toDTO.articleDTO(article) });
    } catch (error) {
      errors.unhandledResponse(res, error.message);
    }
  },

  async update(req, res) {
    const { title, description, body } = req.body.article;
    let { slug } = req.params;
    const userId = req.userId;

    try {
      let article = await Article.findOne({
        where: { slug },
        include: [{ association: "tagList" }, { association: "authorName" }],
      });
      if (!article) {
        errors.notFoundResponse(res);
      }

      if (article.author != userId) {
        errors.unauthorizedResponse(res);
      }

      if (title) {
        slug = title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");
      }

      await article.update({
        slug,
        title,
        description,
        body,
      });

      article.tagList = article.tagList.map((Tag) => {
        return Tag.dataValues.name;
      });

      return res.status(200).send({ article: toDTO.articleDTO(article) });
    } catch (error) {
      errors.unhandledResponse(res, error.message);
    }
  },

  async delete(req, res) {
    const { slug } = req.params;
    const userId = req.userId;

    try {
      const article = await Article.findOne({ where: { slug } });

      if (!article) {
        errors.notFoundResponse(res);
      }

      if (article.author != userId) {
        errors.unauthorizedResponse(res);
      }

      await article.destroy({ where: { slug } });
      res.status(200).send({});
    } catch (error) {
      errors.unhandledResponse(res, error.message);
    }
  },
};
