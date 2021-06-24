const { Model, DataTypes } = require("sequelize");

class Article extends Model {
  static init(sequelize) {
    super.init(
      {
        slug: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        body: DataTypes.TEXT,
        author: DataTypes.INTEGER,
      },
      {
        sequelize,
        timestamps: true,
        tableName: "articles",
      }
    );
  }
  static associate(models) {
    this.belongsToMany(models.Tag, {
      foreignKey: "articleId",
      through: "articleTags",
      as: "tagList",
    });
  }
}

module.exports = Article;
