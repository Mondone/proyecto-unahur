'use strict';
module.exports = (sequelize, DataTypes) => {
  const alumno = sequelize.define('alumno', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    mail: DataTypes.STRING
  }, {});

  alumno.associate = function(models) {
    alumno.hasMany(models.cursa,{
      as: 'cursa',
      foreignKey: 'id_alumno'
    })
  }
  
  return alumno;
};
