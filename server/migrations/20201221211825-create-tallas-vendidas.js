'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tallasVendidas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cantidad: {
        type: Sequelize.INTEGER
      },
      id_detalle_talla: {
        type: Sequelize.INTEGER,
        references: {
          model: 'DetalleTallas',
          key: 'id',
          as: 'id_detalle_talla',
        }
      },
      id_precios: {
        type: Sequelize.INTEGER,
        references: {
          model: 'precios',
          key: 'id',
          as: 'id_precios',
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
    await queryInterface.dropTable('tallasVendidas');
  }
};