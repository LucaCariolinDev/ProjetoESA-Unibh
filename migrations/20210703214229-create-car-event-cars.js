'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('CarEventCars', { 
      //id: { }
      CarId: { 
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Cars",
          key: "id"
        },
        onDelete: 'CASCADE'
      },
      CarEventId: { 
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "CarEvents",
          key: "id"
        },
        onDelete: 'CASCADE'
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
