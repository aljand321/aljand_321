import model from '../models';
const Sequelize = require('sequelize');
const op = Sequelize.Op;

const { admin } = model;
const { Tienda } = model;
class Admin {
    static async createAdmin(req, res) {
        const { nombres, apellidos, email, user, password, rol } = req.body;
        console.log(await verificar_email_user(email, user))
        if (await verificar_email_user(email, user)){
            res.status(400).json({
                msg:"email o usario ya esta registrado"
            })
        }else{
            try {
                const resp = await admin.create({
                    nombres, apellidos, email, user, password, rol
                });
                res.status(200).json({
                    msg:"Datos insertados correctamente",
                    resp                    
                })
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    msg:"Error. no se pudo insertar los datos"
                })
            }
        }       
    }
    static async listAdmin(req,res){
        try {
            const dataList  = await admin.findAll()
            res.status(200).json(dataList)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                msg:"Error al mostrar los datos"
            })
        }
    }
    static async AdminTiendas(req,res){
        try {
            const list = await admin.findAll({
                include:[
                    {model: Tienda}
                ]
            });
            res.status(200).json(list);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg:"Error al mostrar los datos"
            })
        }
    }
}
async function verificar_email_user (email,user){
    try {
        const data = await admin.findOne({
            where: {
                [op.or]: [{email}, {user}]
            }
        })
        if (data){
            return true
        }else{
            return false
        }        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Erro no se puede mostrar los datos"
        })
    }
}
export default Admin;