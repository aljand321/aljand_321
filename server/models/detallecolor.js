'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detalleColor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  detalleColor.init({
    descripcion: DataTypes.TEXT,
    cantidad: DataTypes.INTEGER,
    id_detalle_talla: DataTypes.INTEGER,
    id_color: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'detalleColor',
  });
  return detalleColor;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const detalleColor = sequelize.define('detalleColor', {
    descripcion: {
      type: DataTypes.TEXT
    },
    cantidad: {
      type: DataTypes.INTEGER
    },
    id_detalle_talla: {
      type: DataTypes.INTEGER
    },
    id_color: {
      type: DataTypes.INTEGER
    } 
  }, {});
  detalleColor.associate = (models) => {
    // associations can be defined here    
  };
  return detalleColor;
};