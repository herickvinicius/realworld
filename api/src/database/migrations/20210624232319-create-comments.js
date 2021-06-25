"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("comments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      author: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      article: {
        type: Sequelize.INTEGER,
        references: { model: "articles", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("comments");
  },
};
