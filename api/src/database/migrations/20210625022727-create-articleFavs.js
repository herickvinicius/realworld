"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("articleFavs", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      articleId: {
        type: Sequelize.INTEGER,
        references: { model: "articles", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("articleFavs");
  },
};
