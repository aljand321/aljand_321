'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('VentaRealizadas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productos: {
        type: Sequelize.JSON
      },
      total: {
        type: Sequelize.DECIMAL
      },
      id_vendedor: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Vendedors',
          key: 'id',
          as: 'id_vendedor',
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('VentaRealizadas');
  }
};