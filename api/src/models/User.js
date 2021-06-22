const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: {
          type: DataTypes.STRING,
          unique: true,
        },
        username: {
          type: DataTypes.STRING,
          unique: true,
        },
        password: DataTypes.STRING,
        bio: DataTypes.TEXT,
        image: DataTypes.STRING,
      },
      {
        defaultScope: {
          attributes: ["email", "username", "bio", "image"],
        },
        sequelize,
        timestamps: false,
        tableName: "users",
      }
    );
  }
}

module.exports = User;
