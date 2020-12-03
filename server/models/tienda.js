'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tienda = sequelize.define('Tienda', {
    nombreT: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Inserte nombre de la tienda'
      }
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Inserte derecion de la tienda por favor'
      }
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Inserte un numero de telefono por favor'
      }
    },
    id_admin: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'id administrador no puede estar vacio'
      },
      references: {
        model: 'admin',
        key: 'id',
        as: 'id_admin',
      }
    },
    
    
  }, {});
  Tienda.associate = (models) => {
    // associations can be defined here
    Tienda.hasMany(models.Vendedor, {
      foreignKey: 'id_tienda',
    });
    Tienda.hasMany(models.Almacen, {
      foreignKey: 'id_tienda',
    });
    Tienda.belongsTo(models.admin, {
      foreignKey: 'id_admin',
      onDelete: 'CASCADE'
    });
  };
  return Tienda;
};