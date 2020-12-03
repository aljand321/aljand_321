'use strict';
module.exports = (sequelize, DataTypes) => {
  const Marca = sequelize.define('Marca', {
    nombre: {
      type: DataTypes.STRING
    }   
  }, {});
  Marca.associate = (models) => {
    // associations can be defined here    
    Marca.hasMany(models.Productos, {
      foreignKey: 'id_marca',
    });
  };
  return Marca;
};