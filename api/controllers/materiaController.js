const models = require("../models/");


const addMateria = async(req,res) => {
    console.log("Agregando materia...");
    try {
        const {cod_materia, nombre,id_carrera} = req.body;
        console.log(cod_materia)
        let mat = await findMateriaById(cod_materia);
        if(!mat){
            mat = await models.materia.create({cod_materia,nombre,id_carrera});
            res.status(200).json({mat});
        }else{
            res.status(400).json({message: "Ya existe esa materia"})
        }
    } catch (err) {
        res.status(500).json({message: err})
    }
}

const getAllMaterias = async(req,res) => {
    console.log("obteniendo materias...");
    try {
        const {page,view} = req.query;
        let mats;
        if(page && view){
            mats =  await models.materia.findAll({
                                offset: parseInt(page),
                                limit: parseInt(view),
                    })
        }else{
            mats = await models.materia.findAll({});
        }
        res.status(200).json({mats})
    } catch (err) {
        res.status(500).json({message: err})
    }
}

const updateMateria = async(req,res) => {
    console.log("actualizando...");
    try {
        const cod_materia = req.params.id;
        const {nombre,id_carrera} = req.body;
       
        console.log(cod_materia,nombre,id_carrera)
        let mat = await findMateriaById(cod_materia);
        if(mat){
            mat = await models.materia.update({
                nombre,
                id_carrera
            },{
                where:{cod_materia}
            })
            res.status(200).json({mat});
        } else{
            res.status(400).json({message: "Materia no encontrada"})
        }
    } catch (err) {
        res.status(500).json({message: err})
    }
}

const findMateriaById = async (cod_materia) => {
console.log("Estoy aca")
    try{
        const mat = await models.materia.findOne({
            where: {cod_materia}
        })
        console.log(mat)
        return mat;    
    }catch(err){
        res.status(500).json({message: "UPS"})
    }

}

module.exports = { 
    addMateria,
    getAllMaterias,
    updateMateria,
    findMateriaById
 }

