"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tags", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("tags");
  },
};
