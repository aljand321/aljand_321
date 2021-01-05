'use strict';
module.exports = (sequelize, DataTypes) => {
  const tallasVendidas = sequelize.define('tallasVendidas', {
    cantidad: DataTypes.INTEGER,
    id_detalle_talla: {
      type: DataTypes.INTEGER,
      references: {
        model: 'DetalleTalla',
        key: 'id',
        as: 'id_detalle_talla',
      }
    },
    id_precios: {
      type: DataTypes.INTEGER,
      references: {
        model: 'precios',
        key: 'id',
        as: 'id_precios',
      }
    }   
  }, {});
  tallasVendidas.associate = (models) => {
    // associations can be defined here    
    tallasVendidas.belongsTo(models.DetalleTalla, {
      foreignKey: 'id_detalle_talla',
      onDelete: 'CASCADE'
    });
    tallasVendidas.belongsTo(models.precios, {
      foreignKey: 'id_precios',
      onDelete: 'CASCADE'
    });
  };
  return tallasVendidas;
};