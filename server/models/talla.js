'use strict';
module.exports = (sequelize, DataTypes) => {
  const Talla = sequelize.define('Talla', {
    nombre: {
      type: DataTypes.STRING
    }   
  }, {});
  Talla.associate = (models) => {
    // associations can be defined here    
    Talla.hasMany(models.Ventas, {
      foreignKey: 'id_vendedor',
    });
    Talla.hasMany(models.DetalleTalla, {
      foreignKey: 'id_talla',
    });
  };
  return Talla;
};