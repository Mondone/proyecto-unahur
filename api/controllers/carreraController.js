const models = require("../models");

const addCarrera = async (req,res) => {
    console.log("Creando carrera...")
    try {
        const {nombre} = req.body;
        let car = await findCarreraByNombre(nombre);
        if(!car){
            car = await models.carrera.create({nombre});
            res.status(200).json({car})
            
        } else{
            res.status(400).json({message: "Ya existe esa Carrera"})
        }
        
    } catch (err) {
        res.status(500).json({message: err})
    }
}

const getAllCarreras = async(req,res) => {
    console.log("Listando todos las carreras...")
    try {
        const cars = await models.carrera.findAll({})
        res.status(200).json({cars});
    } catch (err) {
        res.status(500).json({message: err})
    }
}

const updateCarrera = async(req,res) => {
    console.log("Actualizando carrera...");
    try {
        const {nombre} = req.body;
        const {id} = req.params;
        let car = await findCarreraById(id);
        if(car){
            car = await models.carrera.update({
                nombre
            },{
                where: {id}
            });
            res.status(200).json({car});
        }else{
            res.status(400).json({message: "Nombre de carrera NO encontrado"})
        }
    } catch (err) {
        res.status(500).json({message: err})
    }
}

const deleteCarrera = async(req,res) => {
    console.log("Eliminando carreara...");
    try {
        const {id} = req.params;
        let car = await findCarreraById(id);
        if(car){
            car = await models.carrera.destroy({
                where: {id}
            })
            res.status(200).json({car})
        }else{
            res.status(400).json({message: "El ID de Carrera no fue encontrado"})
        }
    } catch (err) {
        res.status(500).json({message: err})
    }
}

const materiasPorCarrera = async(req,res) =>{
    console.log("listando materias...");
    try {
        const {id} = req.params;
        const car = await findCarreraById(id);
        console.log(car)
        if(car){
            const result = await models.carrera.findAll({
                attributes: ["id", "nombre"],
                include: [{
                    as: 'tiene-mats',
                    model:models.materia}]
                })
            res.status(200).json({result})      
        } else {
            res.status(400).json({message: "Carrera no encontrada"})
        }      
    } catch (err) {
        res.status(500).json({message: err})
    }
    
}

const findCarreraByNombre = async(nombre) =>{
    try{
        const car = await models.carrera.findOne({
            where: {nombre}
        })
        return car;    
    }catch(err){
        res.status(500).json({message: err})
    }
}

const findCarreraById = async(id) => {
    try{
        const car = await models.carrera.findOne({
            where: {id}
        })
        return car;    
    }catch(err){
        res.status(500).json({message: err})
    }
}

module.exports = {
    addCarrera,
    getAllCarreras,
    updateCarrera,
    deleteCarrera,
    materiasPorCarrera
}