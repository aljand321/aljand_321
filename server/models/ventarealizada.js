'use strict';
module.exports = (sequelize, DataTypes) => {
  const VentaRealizada = sequelize.define('VentaRealizada', {
    productos: DataTypes.JSON,
    total: DataTypes.DECIMAL,
    id_vendedor:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Vendedor',
        key: 'id',
        as: 'id_vendedor',
      }
    }   
  }, {});
  VentaRealizada.associate = (models) => {
    // associations can be defined here    
    VentaRealizada.belongsTo(models.Vendedor, {
      foreignKey: 'id_vendedor',
      onDelete: 'CASCADE'
    });
  };
  return VentaRealizada;
};