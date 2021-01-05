'use strict';
module.exports = (sequelize, DataTypes) => {
  const DetalleTalla = sequelize.define('DetalleTalla', { 
    descripcion: {
      type: DataTypes.TEXT
    },
    cantidad: {
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
    },
    id_precios: {
      type: DataTypes.INTEGER,
      references: {
        model: 'precios',
        key: 'id',
        as: 'id_precios',
      }
    },
  }, {});
  DetalleTalla.associate = (models) => {
    // associations can be defined here 
    DetalleTalla.hasMany(models.tallasVendidas, {
      foreignKey: 'id_detalle_talla',
    });   
    DetalleTalla.belongsTo(models.Productos, {
      foreignKey: 'id_producto',
      onDelete: 'CASCADE'
    });
    DetalleTalla.belongsTo(models.Talla, {
      foreignKey: 'id_talla',
      onDelete: 'CASCADE'
    });
    DetalleTalla.belongsTo(models.precios, {
      foreignKey: 'id_precios',
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