'use strict';
module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define('materia', {
    cod_materia: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    id_carrera: DataTypes.INTEGER
  }, {});
  materia.associate = function(models) {
    // associations can be defined here
  };
  return materia;
};