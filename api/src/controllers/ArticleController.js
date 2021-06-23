const Article = require("../models/Article");
const Tag = require("../models/Tag");

module.exports = {
  async getArticle(req, res) {
    const { slug } = req.params;
    const article = await Article.findOne(slug);

    if (!article) {
      return res.status(404).send({ error: error.message });
    }

    return res.status(200).send({ article });
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

  // TO DO: provide userId by JWT.
  async update(req, res) {
    const { email, password, bio, image } = req.body.user;
    const { userId } = req.params;

    console.log(email, password, bio, image);
    console.log(userId);

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).send({ error: "NOT FOUND" });
      }

      const updatedUser = await user.update({
        email,
        password,
        bio,
        image,
      });
      return res.status(200).send({ updatedUser });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
};
