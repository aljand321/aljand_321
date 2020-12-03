import model from '../models';

const  { Vendedor } = model;

class Vendedors {
    static async createVendedor(req,res){
        try {
            const { nombres,apellidos,direccion,telefono,user,password } = req.body;
            const { id_tienda } = req.params;
            const resp = await Vendedor.create({
                nombres,apellidos,direccion,telefono,user,password,id_tienda
            })
            res.status(200).json(resp);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                msg: "Error no se pudo crear la tabla"
            })
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

export default Vendedors