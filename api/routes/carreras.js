var express = require("express");
var router = express.Router();
const carreraController = require("../controllers/carreraController");

router.post("/", carreraController.addCarrera);
router.get("/", carreraController.getAllCarreras);
router.get("/:id",carreraController.findCarreraById);
router.get("/materiascarrera/:id", carreraController.materiasPorCarrera);
router.put("/:id", carreraController.updateCarrera);
router.delete("/:id", carreraController.deleteCarrera);


module.exports = router;
