'use strict';
module.exports = (sequelize, DataTypes) => {
  const profesor = sequelize.define('profesor', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    mail: DataTypes.STRING,
    fechaNacimiento: DataTypes.STRING
  }, {});
  profesor.associate = function(models) {
    // associations can be defined here
  };
  return profesor;
};