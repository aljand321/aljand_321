'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('detalleColors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      cantidad: {
        type: Sequelize.INTEGER
      },
      id_detalle_talla: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'DetalleTallas',
          key: 'id',
          as: 'id_detalle_talla',
        }
      },
      id_color: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Colors',
          key: 'id',
          as: 'id_color',
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
    await queryInterface.dropTable('detalleColors');
  }
};