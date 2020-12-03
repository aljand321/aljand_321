'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DetalleTallas', {
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
      presioEntrada: {
        type: Sequelize.INTEGER
      },
      precioSalida: {
        type: Sequelize.INTEGER
      },
      totalEntrada: {
        type: Sequelize.INTEGER
      },
      totalSalida: {
        type: Sequelize.INTEGER
      },
      ganancia: {
        type: Sequelize.INTEGER
      },
      id_producto: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Productos',
          key: 'id',
          as: 'id_producto',
        }
      },
      id_talla: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tallas',
          key: 'id',
          as: 'id_talla',
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
    await queryInterface.dropTable('DetalleTallas');
  }
};