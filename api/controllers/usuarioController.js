const models = require("../models/");
const bcrypt = require("bcrypt");
const jwtMiddleware = require("../middlewares/jwt/jwt");
const alumnoController = require("./alumnoController");

const getAllUsuarios = async(req,res) => {
    try {
        let users = await models.usuario.findAll({});
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const addUsuario = async(req,res) => {
    try {
        const{usuario,password,rol} = req.body;

        let usr = await findUsuarioByUsr(usuario);

        if(!usr){
            let hash = await bcrypt.hash(password, 10);
            usr = await models.usuario.create({
                usuario,
                password: hash,
                rol
            });
            res.status(200).json({usr});
        }else{
            res.status(400).json({message: "Usuario ya existente"});
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const updateUsuario = async(req,res) => {
    try {
        const {usuario} = req.params;
        const{password, rol} = req.body;
      
        let usr = await findUsuarioByUsr(usuario);
        console.log("Sali de la busqueda")
        console.log(usr)
        if(usr){
            usr = await models.usuario.update({
                password,
                rol
            },{
            where:{usuario}
        });
        res.status(200),json({usr});
        }else{
            res.status(400).json({message: "Usuario no encontrado"});
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const deleteUsuario = async(req,res) => {
    try {
        const {usuario} = req.params;
        let usr = await findUsuarioByUsr(usuario);
        if(usr){
            usr = await models.usuario.destroy({
                where:{usuario}
            });
            res.status(200).json({usr})
        }else{
            res.status(400).json({message: "El usuario no fue encontrado"})
        }
    } catch (error) {
        res.status(500).json({message: err})
    }
}

const findUsuarioByUsr = async (usuario) =>{

    try {
        const usr = await models.usuario.findOne({
            where: {usuario}
        })
        return usr;
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const loginUsr = async (req,res) =>{
    try {
        const {usuario,password} = req.body;
        const usr = await findUsuarioByUsr(usuario);
        if(usr){
            const unHash = await bcrypt.compare(password, usr.password);
            console.log(unHash)//ok
            if(unHash){
                const token = await jwtMiddleware.obtenerToken(usr);
                res.status(200).json({token});
            }else{
                res.status(400).json({message: "Usuario o Contraseña erroneos."})
            }
            
        }
        else{
            res.status(400).json({message: "Usuario o Contraseña erroneos."})
        }

    } catch (error) {
        res.status(500).json({message: error})
    }
   

}
/*El Admin actualiza las notas del Alumno para una materia dada 
    -Verificar que exista DNI Alumno en Alumno
    -Verificar que exista Codigo de materia en MAteria
    -Actualizar las notas en tabla intermedia Cursa
    */
const actualizarNotas = async(req,res) => {
    try {
        const {dni,nota1,nota2} = req.body;
        let alu = await alumnoController.findAlumnoByDni(dni);
        if(!alu){
            res.status(400).json({message: "El DNI No existe."})
        }else{
            //falta buscar la materia e invocar a Cursa...
            alu = await alumnoController.actualizarNotas(alu,nota1,nota2);
            res.status(200).json({alu})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
}
module.exports = {
    getAllUsuarios,
    addUsuario,
    deleteUsuario,
    updateUsuario,
    loginUsr,
    actualizarNotas
}