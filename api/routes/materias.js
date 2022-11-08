var express = require("express");
var router = express.Router();
var models = require("../models");
const materiaController = require("../controllers/materiaController");

router.post("/", materiaController.addMateria);
router.get("/", materiaController.getAllMaterias);
router.get("/:id", materiaController.findMateriaById);
router.put("/:id", materiaController.updateMateria);
router.delete("/:id", materiaController.deleteMateria); // id o cod_materia para el borrado???

// eze router.get("/:id", materiaController.findMateriaById);

/*
router.get("/:id", (req, res) => {
  findMateria(req.params.id, {
    onSuccess: materia => res.send(materia),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});
*/
// Alumnos por materia hay que transformarlo y sacarlo de aca ???

router.get("/alumnosPorMateria/:id", (req, res, next) => {
  models.materia
    .findAll({
      attributes: ["id", "nombre"],
      include: [{
          as: 'materia-cursa',
          model:models.cursa, attributes: ["id", "id_alumno", "id_materia"],
          include: [{
            as: 'alumno-cursa',
            model: models.alumno, attributes: ["nombre"]
          }]
        }]
    })
    .then(materias => res.send(materias))
    .catch(error => { return next(error)})
});

/* este hay que borrarlo no??
router.delete("/:id", (req, res) => {
  const onSuccess = materia =>
    materia
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});
*/

module.exports = router;
