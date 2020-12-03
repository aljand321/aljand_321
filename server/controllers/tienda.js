import model from '../models';

const { Tienda } = model;

class Tiendas {
    static async createTienda(req,res){
        const {nombreT,direccion,telefono} = req.body;
        const { id_admin } = req.params;
        try {
            const resp = await Tienda.create({
                nombreT,direccion,telefono,id_admin
            });
            res.status(200).json({
                msg:"se insertaron los datos",
                resp
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                msg:"Error no se puede insertar los datos"
            });
        }
    }
    static async listTiendas(req,res){
        try {
            const listTiendas = await Tienda.findAll();
            res.status(200).json(listTiendas);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg:"Error al mostrar los datos"
            });
        }
    }
}

export default Tiendas