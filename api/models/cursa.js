'use strict';
module.exports = (sequelize, DataTypes) => {
  const cursa = sequelize.define('cursa', {
    nota1: DataTypes.INTEGER,
    nota2: DataTypes.INTEGER,
    id_alumno: DataTypes.INTEGER,
    id_materia: DataTypes.INTEGER
  }, {});
  cursa.associate = function(models) {
    // associations can be defined here
  };
  return cursa;
};