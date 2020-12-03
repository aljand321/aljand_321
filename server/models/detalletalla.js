'use strict';
module.exports = (sequelize, DataTypes) => {
  const DetalleTalla = sequelize.define('DetalleTalla', {
    descripcion: {
      type: DataTypes.TEXT
    }, 
    cantidad: {
      type: DataTypes.INTEGER
    },
    presioEntrada: {
      type: DataTypes.INTEGER
    },
    precioSalida: {
      type: DataTypes.INTEGER
    },
    totalEntrada: {
      type: DataTypes.INTEGER
    },
    totalSalida: {
      type: DataTypes.INTEGER
    },
    ganancia: {
      type: DataTypes.INTEGER
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
    }
  }, {});
  DetalleTalla.associate = (models) => {
    // associations can be defined here    
    DetalleTalla.belongsTo(models.Productos, {
      foreignKey: 'id_producto',
      onDelete: 'CASCADE'
    });
    DetalleTalla.belongsTo(models.Talla, {
      foreignKey: 'id_talla',
      onDelete: 'CASCADE'
    });
    DetalleTalla.belongsToMany(models.Color,{
      through: 'detalleColor',
      as: 'color',
      foreignKey: 'id_color'
    });
  };
  return DetalleTalla;
};