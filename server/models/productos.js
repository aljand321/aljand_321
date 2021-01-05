'use strict';
module.exports = (sequelize, DataTypes) => {
  const Productos = sequelize.define('Productos', {
    descripcion: {
      type: DataTypes.TEXT
    },
    cantidad: {
      type: DataTypes.STRING
    },
    imagenes: {
      type: DataTypes.JSON
    },
    id_marca: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Marca',
        key: 'id',
        as: 'id_marca',
      }
    },
    id_tipo: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tipo',
        key: 'id',
        as: 'id_tipo',
      }
    }, 
    id_almacen: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Almacen',
        key: 'id',
        as: 'id_almacen',
      }
    },   
  }, {});
  Productos.associate = (models) => {
    // associations can be defined here    
    Productos.hasMany(models.Ventas, {
      foreignKey: 'id_vendedor',
    });
    Productos.hasMany(models.DetalleTalla, {
      foreignKey: 'id_producto',
    });
    Productos.hasMany(models.FechasProductos, {
      foreignKey: 'id_producto',
    });
    Productos.belongsTo(models.Marca, {
      foreignKey: 'id_marca',
      onDelete: 'CASCADE'
    });
    Productos.belongsTo(models.Tipo, {
      foreignKey: 'id_tipo',
      onDelete: 'CASCADE'
    });
    Productos.belongsTo(models.Almacen, {
      foreignKey: 'id_almacen',
      onDelete: 'CASCADE'
    });
  };
  return Productos;
};