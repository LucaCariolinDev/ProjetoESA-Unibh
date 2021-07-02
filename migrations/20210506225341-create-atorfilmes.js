'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AtorFilmes', { 
      //id: { }
      AtorId: { 
        primaryKey: true,
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Ators",
          key: "id",
          as: "AtorId"
        }
      },
      FilmeId: { 
        primaryKey: true,
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Filmes",
          key: "id",
          as: "FilmeId"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
