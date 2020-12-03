'use strict';
module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define('Color', {
    nombre: {
      type: DataTypes.STRING
    }   
  }, {});
  Color.associate = (models) => {
    // associations can be defined here    
    Color.belongsToMany(models.DetalleTalla,{
      through: 'detalleColor',
      as: 'detalleTalla',
      foreignKey: 'id_detalle_talla'
    });
  };
  return Color;
};