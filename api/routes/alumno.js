var express = require("express");
var router = express.Router();
var models = require("../models");
const alumnoController = require("../controllers/alumnoController");
const { validarInput } = require("../middlewares/validator/alumno");

router.post("/", validarInput, alumnoController.addAlumno);
router.post("/inscribir", alumnoController.inscribirAlumno);
router.get("/", alumnoController.getAllAlumnos);
router.get("/:id", alumnoController.findAlumno);
router.get("/obtenerinscripciones/:id", alumnoController.getInscripciones);
router.put("/:id", alumnoController.updateAlumno);
router.delete("/eliminarinscripcion/", alumnoController.deleteInscripcion);
router.delete("/:id", alumnoController.deleteAlumno);



module.exports = router;