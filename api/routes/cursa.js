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