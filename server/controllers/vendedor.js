import model from '../models';
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const  { Vendedor } = model;

const bcrypt = require('bcryptjs');


class Vendedors {
    static async createVendedor(req,res){
        const { nombres,apellidos,direccion,telefono,user,password,rol_vendedor } = req.body;
        const { id_tienda } = req.params;
        //los roles que se manejaran para el vendedor es admin y vendedor
        if (rol_vendedor == "" || rol_vendedor == null ) return res.status(400).json({
            success:false,
            msg:"El rol del vendedor no se esta mandando"
        });
        if (await verificarnombreTelefono(user, telefono)){
            res.status(400).json({
                msg:"El usario o telefono ya esta registrado"
            })
        }else{
            
            try {
                const passwordEcrypt = await encryptPassword(password)
                const resp = await Vendedor.create({
                    nombres,
                    apellidos,
                    direccion,
                    telefono,
                    user,
                    password: passwordEcrypt,
                    rol_vendedor,
                    id_tienda
                })
                res.status(200).json(resp); 
            } catch (error) {
                console.error(error);
                res.status(500).json({
                    msg: "Error no se pudo crear la tabla"
                })
            }
        }
        
    }
    static async listVendedores(req,res){
        try {
            const resp = await Vendedor.findAll();
            res.status(200).json({
                msg:"lista de vendedores",
                resp
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                msg: "Error no se puede mostrar los datos"
            })
        }
    }
    static async deleteV(req,res){
        try {
            const resp = await Vendedor.findByPk(req.params.id);
            const dataDelete = await resp.destroy();
            res.status(200).json({
                msg:"Vendedor elminado",
                resp
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({
                msg: "Error no se pudo eliminar"
            })
        }
    }
}

async function verificarnombreTelefono(user, telefono){
    try {
        const data = await Vendedor.findOne({
            where: {
                [op.or]: [{telefono}, {user}]
            }
        })
        if (data) return true
        return false
    } catch (error) {
        console.log(error);
        return 'No se puede mostrar los datos'
    }
}

async function encryptPassword(password){
    const salt = await bcrypt.genSalt(10);
    const encrypt= await bcrypt.hash(password, salt);
    return encrypt
}

export default Vendedors