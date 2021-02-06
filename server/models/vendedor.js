'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vendedor = sequelize.define('Vendedor', {
    nombres: {
      type: DataTypes.STRING
    },
    apellidos: {
      type: DataTypes.STRING
    },
    direccion: {
      type: DataTypes.STRING
    },
    telefono: {
      type: DataTypes.STRING
    },
    user: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    rol_vendedor: {
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
  Vendedor.associate = (models) => {
    // associations can be defined here
    Vendedor.hasMany(models.Ventas, {
      foreignKey: 'id_vendedor',
    });
    Vendedor.hasMany(models.VentaRealizada, {
      foreignKey: 'id_vendedor',
    });
    Vendedor.belongsTo(models.Tienda, {
      foreignKey: 'id_tienda',
      onDelete: 'CASCADE'
    });
  };
  return Vendedor;
};