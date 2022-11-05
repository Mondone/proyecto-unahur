const models = require("../models/");

const findMateriaById = async (id) => {

    try{
        const mat = await models.materia.findOne({
            where: {id}
        })
        console.log(alu)
        return alu;    
    }catch(err){
        res.status(500).json({message: "UPS"})
    }

}

module.exports = { findMateriaById }

