'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ventas = sequelize.define('Ventas', {
    descripcion: {
      type: DataTypes.TEXT
    },
    cantidad: {
      type: DataTypes.INTEGER
    },
    precioSalida: {
      type: DataTypes.INTEGER
    },
    descuento: {
      type: DataTypes.INTEGER
    },
    total: {
      type: DataTypes.INTEGER
    },    
    id_vendedor: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Vendedor',
        key: 'id',
        as: 'id_vendedor',
      }
    },  
    id_producto: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Productos',
        key: 'id',
        as: 'id_producto',
      }
    }, 
    id_talla: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Talla',
        key: 'id',
        as: 'id_talla',
      }
    }, 
  }, {});
  Ventas.associate = (models) => {
    // associations can be defined here        
    Ventas.belongsTo(models.Vendedor, {
      foreignKey: 'id_vendedor',
      onDelete: 'CASCADE'
    });
    Ventas.belongsTo(models.Productos, {
      foreignKey: 'id_producto',
      onDelete: 'CASCADE'
    });
    Ventas.belongsTo(models.Talla, {
      foreignKey: 'id_talla',
      onDelete: 'CASCADE'
    });
  };
  return Ventas;
};