import model from '../models';

const { Tienda } = model;

class Tiendas {
    static async createTienda(req,res){
        const {nombreT,direccion,telefono} = req.body;
        const { id_admin } = req.params;

        if (await verificarNombreT(nombreT)){
            res.status(400).json({
                msg:"Nombre ya esta registrado"
            })
        }else{
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

async function verificarNombreT (nombreT){
    try {
        const data = await Tienda.findOne({
            where : { nombreT }
        });
        if (data){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.log(error)
        return 'No se puede mostrar los datos'
    }
}

export default Tiendas