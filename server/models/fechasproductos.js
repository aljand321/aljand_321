'use strict';
module.exports = (sequelize, DataTypes) => {
  const FechasProductos = sequelize.define('FechasProductos', {
    descripcion: DataTypes.TEXT,
    FechaRegistro: DataTypes.DATE,
    cantidad: DataTypes.INTEGER,
    precioTotal: DataTypes.DECIMAL,
    id_producto: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Productos',
        key: 'id',
        as: 'id_producto',
      }
    }
  }, {});
  FechasProductos.associate = (models) => {
    // associations can be defined here    
    FechasProductos.belongsTo(models.Productos, {
      foreignKey: 'id_producto',
      onDelete: 'CASCADE'
    });
  };
  return FechasProductos;
};