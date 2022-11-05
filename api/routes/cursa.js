var express = require("express");
var router = express.Router();
var models = require("../models");
const materia = require("../models/materia");


router.get("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  models.cursa
    .findAll({
      attributes: ["id", "nombre"]
    })
    .then(cursas => res.send(cursas))
    .catch(() => res.sendStatus(500));
});

/*Esto no puede estar acá*/
router.post("/", (req, res) => {
  let {id_alumno, id_materia,nota1,nota2} = req.body;
  if(id_alumno === ""){
    res.status(400).send("ID Alumno no puede ser vacío")
  }else if(id_materia === ""){
    res.status(400).send("ID Materia no puede ser vacío")
  } else{
    /*faltaría poder validar que exista el alumno y la materia pero no entiendo como poder invocar el "findAlumno" */
    models.cursa
    .create({ 
        id_alumno: id_alumno,
        id_materia: id_materia,
        nota1: nota1,
        nota2: nota2
     })
    .then(cursa => res.status(201).send({ id: cursa.id  }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: ya existe el curso con el mismo id')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });  
  }

});

/*  HACER METODOS UPDATE PARA LAS NOTAS
const findCursa = (id, { onSuccess, onNotFound, onError }) => {
  models.cursa
    .findOne({
      attributes: ["id", "nombre", "alumno", "mail"],
      where: { id }
    })
    .then(alumno => (alumno ? onSuccess(alumno) : onNotFound()))
    .catch(() => onError());
};
*/
/*
router.get("/:id", (req, res) => {
  findAlumno(req.params.id, {
    onSuccess: alumno => res.send(alumno),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = alumno =>
    alumno
      .update({ nombre: req.body.nombre,
                  id: req.body.id 
              }, 
              { fields: ["nombre", "id"] }
              )
      .then(() => res.sendStatus(200))
      .catch(error => {
          if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra alumno con el mismo nombre')
          }
          else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
          }
      });
    findMateria(req.params.id, {
      onSuccess,
      onNotFound: () => res.sendStatus(404),
      onError: () => res.sendStatus(500)
    });
});

router.delete("/:id", (req, res) => {
    const onSuccess = alumno =>
      alumno
        .destroy()
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500));
    findAlumno(req.params.id, {
      onSuccess,
      onNotFound: () => res.sendStatus(404),
      onError: () => res.sendStatus(500)
    });
});
  */
module.exports = router;