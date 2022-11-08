'use strict';
module.exports = (sequelize, DataTypes) => {
  const cursa = sequelize.define('cursa', {
    fecha: DataTypes.DATE,
    nota_1: DataTypes.INTEGER,
    nota_2: DataTypes.INTEGER,
    dni_alumno: DataTypes.INTEGER,
    cod_materia: DataTypes.INTEGER
  }, {});
  cursa.associate = function(models) {
    // associations can be defined here
    cursa.belongsTo(models.alumno,{
      as: 'pertence-a-alu',
      foreignKey: 'dni_alumno'
    })

    /*cursa.belongsTo(models.materia,{
      as: 'pertenece-a-mat',
      foreignKey: 'cod_materia'
    })*/
  };
  return cursa;
};