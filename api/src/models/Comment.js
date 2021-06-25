const { Model, DataTypes } = require("sequelize");

class Comment extends Model {
  static init(sequelize) {
    super.init(
      {
        body: DataTypes.TEXT,
      },
      {
        sequelize,
        timestamps: true,
        tableName: "comments",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "author",
    });

    this.belongsTo(models.Article, {
      foreignKey: "article",
    });
  }
}

module.exports = Comment;
