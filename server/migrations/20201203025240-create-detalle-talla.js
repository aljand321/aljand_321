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
    await queryInterface.dropTable('DetalleTallas');
  }
};