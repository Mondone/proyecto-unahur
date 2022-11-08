'use strict';
module.exports = (sequelize, DataTypes) => {
  const alumno = sequelize.define('alumno', {
    dni: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    mail: DataTypes.STRING
  }, {});
  alumno.associate = function(models) {
    // associations can be defined here
    alumno.hasMany(models.cursa,{
      as:'tiene-curs',
      foreignKey: 'dni_alumno'
    })
  };
  return alumno;
};