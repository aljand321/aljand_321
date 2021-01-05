'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FechasProductos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      FechaRegistro: {
        type: Sequelize.DATE
      },
      cantidad: {
        type: Sequelize.INTEGER
      },
      precioTotal: {
        type: Sequelize.DECIMAL
      },
      id_producto: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Productos',
          key: 'id',
          as: 'id_producto',
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
    await queryInterface.dropTable('FechasProductos');
  }
};