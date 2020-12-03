'use strict';
module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define('admin', {
    nombres: {
      type: DataTypes.STRING,
      allowNull: {
        args: true,
        msg: 'Inserte nombre por favor'
      }
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: {
        args: true,
        msg: 'Inserte los apellidos por favor'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: true,
        msg: 'Inserte su email por favor'
      },
      unique: {
        args: true,
        msg: 'Ya existe ese email'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Porfavor inserte un email valido'
        },
      },
    },
    user: {
      type: DataTypes.STRING,
      allowNull: {
        args: true,
        msg: 'Inserte un usuario'
      },
      unique: {
        args: true,
        msg: 'Ya existe ese usuario'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: true,
        msg: 'Inserte una contraceña por favor'
      },
      validate: {
        isNotShort: (value) => {
          if (value.length < 6) {
            throw new Error('la contraceña debe tener almenos 6 caracteres');
          }
        },
      },
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Selecione su rol porfavor'
      }
    },
  }, {});
  admin.associate = (models) => {
    // associations can be defined here
    admin.hasMany(models.Tienda, {
      foreignKey: 'id_admin',
    });
  };
  return admin;
};
//ssssssssssssssssss

