const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        bio: DataTypes.TEXT,
        image: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = User;
