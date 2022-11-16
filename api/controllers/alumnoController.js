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
    console.log("Inscribiendo ...")
    try {
        const {fecha,dni_alumno,cod_materia} = req.body;
        //validar que no esten vacios con el Middelware..
        const alu = await findAlumnoByDni(dni_alumno);
        if(!alu){
            res.status(400).json({message: "Alumno no existente"}) 
        } else{
            const mat = await materiaController.findMateriaById(cod_materia);
            if(!mat){
                res.status(400).json({message: "Materia no existente"})
            } else {
                const cursa = await models.cursa.create({
                                        fecha,
                                        dni_alumno,
                                        cod_materia
                                })
                res.status(200).json({cursa})
            }
        }        
    } catch (err) {
        res.status(500).json({message: err})
    }
}

const deleteInscripcion = async (req,res) => {
    console.log("Borrando inscripcion...")
    const {dni_alumno,cod_materia} = req.query;
    const alu = await findAlumnoByDni(dni_alumno);
    if(!alu){
        res.status(400).json({message: "Alumno no existente"});
    } else{
        const mat = await materiaController.findMateriaById(cod_materia);
        if(!mat) {
            res.status(400).json({message: "Materia no existente"});
        } else {
            const inscripcion = await models.cursa.destroy({
                where:{
                    dni_alumno,
                    cod_materia}
            })
            res.status(200).json({message: inscripcion})
        }
    }
}

const getInscripciones = async(req,res) => {
    console.log("Cursadas de un alumno...");
    try {
        const dni_alumno = req.params.id;
        const alu = await findAlumnoByDni(dni_alumno);
        if(!alu){
            res.status(400).json({message: "Alumno no existente"});
        }else{
            const inscripciones = await models.alumno.findOne({
                                    attributes: ["dni", "nombre","apellido"],
                                    where: {dni: dni_alumno},
                                    include: [
                                        {
                                         as: 'tiene-curs',
                                         model:models.cursa,
                                         include: [{
                                            as: 'pertenece-a-mat',
                                            model: models.materia
                                         }]
                                        }]
                                })
            res.status(200).json({inscripciones});
        }
    } catch (error) {
        
    }

 }
//obtener alumno por params!
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
/* FALTA VER EL TEMA DE LA ACTUALIZACION DE MATERIA.*/
const actualizarNotas = async(dni_alumno,cod_materia,nota_1,nota_2) =>{
    console.log(dni_alumno, cod_materia, nota_1, nota_2)
    try {
        const cursa = await models.cursa.update({
            nota_1,
            nota_2
        },{
            where: {
                dni_alumno,
                cod_materia
            }
        })
        return cursa;
    }    
     catch (error) {
        console.log(error)
    }

}

module.exports = {
    findAlumnoByDni,
    findAlumno,
    addAlumno,
    inscribirAlumno,
    getAllAlumnos,
    updateAlumno,
    deleteAlumno,
    getInscripciones,
    deleteInscripcion,
    actualizarNotas
}
