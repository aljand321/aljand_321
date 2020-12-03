'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tipo = sequelize.define('Tipo', {
    nombre: {
      type: DataTypes.STRING
    }   
  }, {});
  Tipo.associate = (models) => {
    // associations can be defined here    
    Tipo.hasMany(models.Productos, {
      foreignKey: 'id_tipo',
    });
  };
  return Tipo;
};