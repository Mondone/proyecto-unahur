const models = require("../models/");
const materiaController = require("../controllers/materiaController");

const getAllAlumnos = async(req,res) => {
    console.log("Listando todos los alumnos");
    try{
        let alus = await models.alumno.findAll({});
        console.log(alus)
        alus ? res.status(200).json({alus}) : res.status(400).json({alus})
    }catch(err){
        res.status(500).json({message: err})
    }
}

const addAlumno = async (req,res) => {
    console.log("Creando...")
    try{
        const {dni,nombre,apellido,mail} = req.body;
        let alu =  await findAlumnoByDni(dni);
        console.log(alu)
        if(!alu){
            alu = await models.alumno.create({dni,nombre,apellido,mail})
            res.status(200).json({alu})
        }else{
            res.status(400).json({message: "Ya existe ese DNI de alumno."})
        }
    }catch(err){
        res.status(500).json({message: err})
    }
}

const updateAlumno = async(req,res) => {
    console.log("Actualizando...");
    try{
        const dni = req.params.id;
        console.log(dni)
        const {nombre,apellido,mail} = req.body;
        console.log(nombre,apellido,mail)
        let alu = await findAlumnoByDni(dni);
        if(alu){
            alu = await models.alumno.update({
                nombre,
                apellido,
                mail
            },{
                where:{dni}
            })
            res.status(200).json({alu});
        } else{ 
            res.status(400).json({message: "DNI no encontrado para actualizar"})
        }  
    }catch(err){
        res.status(500).json({message: err})
    }
}

const deleteAlumno = async(req,res) => {
    console.log("Borrando....");
    try {
        const dni = req.params.id;
        //hacer validacion
        let alu = await findAlumnoByDni(dni);
        if(alu){
            alu = await models.alumno.destroy({
                where: {dni}
            })
            res.status(200).json({alu})
        }else{
            res.status(400).json({message: "El DNI no fue encontrado"})
        }
    } catch (err) {
        res.status(500).json({message: err})
    }
}

const inscribirAlumno = async(req,res) => {
    console.log("Hola entre")
    console.log(req.body)
    res.send(req.body)
    /*const {dni,id_materia} = req.params;
    console.log(dni+" - " + id_materia)
    res.send({dni})
    try{
       // let mat = await materiaController.findMateriaById(id_materia)
        console.log(mat)
        res.status(200).json({mat})
    } catch(err){
        res.status(500).json({message: "I am so so sorry"})
    }*/
}
//obtener alumno por params
const findAlumno = async (req,res) => {
    const dni = req.params.id;
    console.log("soy el dni" + dni);
    try{
        console.log("Estoy ac")
        const alu = await models.alumno.findOne({
            where: {dni}
        })
        res.status(200).json({alu});
        return alu;    
    }catch(err){
        res.status(500).json({message: err})
    }
}

const findAlumnoByDni = async (dni) => {
    try{
        const alu = await models.alumno.findOne({
            where: {dni}
        })
        console.log(alu)
        return alu;    
    }catch(err){
        res.status(500).json({message: "UPS"})
    }
}

module.exports = {
    findAlumnoByDni,
    findAlumno,
    addAlumno,
    inscribirAlumno,
    getAllAlumnos,
    updateAlumno,
    deleteAlumno
}
