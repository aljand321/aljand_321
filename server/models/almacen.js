'use strict';
module.exports = (sequelize, DataTypes) => {
  const Almacen = sequelize.define('Almacen', {
    codigo: {
      type: DataTypes.STRING
    },
    tamanio: {
      type: DataTypes.STRING
    },
    cantidadDisponible: {
      type: DataTypes.STRING
    },
    descripcion: {
      type: DataTypes.STRING
    },
    id_tienda: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tienda',
        key: 'id',
        as: 'id_tienda',
      }
    }   
  }, {});
  Almacen.associate = (models) => {
    // associations can be defined here    
    Almacen.hasMany(models.Productos, {
      foreignKey: 'id_almacen',
    });
    Almacen.belongsTo(models.Tienda, {
      foreignKey: 'id_tienda',
      onDelete: 'CASCADE'
    });
  };
  return Almacen;
};