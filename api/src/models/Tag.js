const { Model, DataTypes } = require("sequelize");

class Tag extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize,
        timestamps: false,
        tableName: "tags",
      }
    );
  }
  // static associate(models) {
  //   this.belongsToMany(models.Article, {
  //     foreignKey: "tagId",
  //     through: "articleTags",
  //     as: "articleList",
  //   });
  // }
}

module.exports = Tag;
