'use strict';
module.exports = (sequelize, DataTypes) => {
  const precios = sequelize.define('precios', {
    precio_entrada: DataTypes.DECIMAL,
    precio_salida: DataTypes.DECIMAL  
  }, {});
  precios.associate = (models) => {
    // associations can be defined here    
    precios.hasMany(models.tallasVendidas, {
      foreignKey: 'id_precios',
    });
    precios.hasMany(models.DetalleTalla, {
      foreignKey: 'id_precios',
    });
  };
  return precios;
};