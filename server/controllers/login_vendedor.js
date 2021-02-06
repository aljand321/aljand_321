import model from "../models";
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const  { Vendedor } = model;

const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const config = require('../../dataConfig');

class Login {
    static async login(req,res){
        const { user, password } = req.body;
        //console.log(user, password, " ssssssssss")
        const vendedor = await userVendedor(user, password);
        if (vendedor.success == false) return res.status(200).json(vendedor)
        const token = await createtoken(vendedor.vendedor);
        if (token.true == false) return res.status(404).json(token);
        
        return res.status(200).json({
            success:true,
            msg:"Datos correctos",
            vendedor:vendedor.vendedor,
            token
        });
    }
};

async function userVendedor(user, password){
    try {
        const vendedor = await  Vendedor.findOne({
            where : { user },
            attributes:['nombres','apellidos','telefono','direccion','password']
        })  
        
        if (vendedor == null || vendedor == '') return { success:false, msg:"Nombre de usario incorrecto" }

        const valdidataPassword = await validatePassword(vendedor.password, password)
        if (valdidataPassword == false) return { success:false, msg:"Contraceña incorrecta" }

        return { success:true, msg:"Tabla datos vendedor", vendedor:{
            nombres:vendedor.nombres,
            apellidos:vendedor.apellidos,
            telefono:vendedor.telefono,
            direccion:vendedor.direccion
        } }

    } catch (error) {
        console.error(error);
        return { success:false, msg:"No se puede mostrar los datos del la tabla vendedor" }
    }
}

async function validatePassword(passwordBD, passwordBody){
    return bcrypt.compare(passwordBody, passwordBD)
}

async function createtoken(data){
    try {
        const token = await jwt.sign({vendedor:data}, config.secret, {expiresIn:'1h'});
        return { success:true, msg:"token creado", token }
    } catch (error) {
        console.log(error)
        return { success:false, msg:"No se pudo crear un token" }
    }
} 

export default Login;
