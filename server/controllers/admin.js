import model from '../models';

const { admin } = model;
const { Tienda } = model;
class Admin {
    static async createAdmin(req, res) {
        const { nombres, apellidos, email, user, password, rol } = req.body;
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

export default Admin;