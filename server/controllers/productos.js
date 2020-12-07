import model from '../models';

import ValidationProductos from './validations/validationProductos';

const { Productos } = model;

class Producto {
    static async create(req, res) {
        const { descripcion, cantidad, id_marca, id_tipo, id_almacen } = req.body;

        const tamanio = await ValidationProductos.verfiTamanio(id_almacen);
        
        const verfiTamanio = await ValidationProductos.validarTamanio(tamanio,id_almacen,cantidad);
        
        if (verfiTamanio.success){
            try {            
                const resp = await Productos.create({
                    descripcion, cantidad, id_marca, id_tipo, id_almacen
                });
                res.status(200).json({            
                    msg:verfiTamanio.msg,
                    resp
                })
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    msg: "no se puede crear los datos"
                })
            }
        }else{
            res.status(400).json({
                msg:verfiTamanio.msg
            })
        }
        
        
    }

    static async pruebas(req, res) {
        const { id_almacen } = req.params
        
        res.status(200).json(data);

    }
    static async list(req, res) {
        try {
            const resp = await Productos.findAll();
            res.status(200).json({
                msg: "Lista de Productos o ropas",
                resp
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "no se puede mostrar los datos"
            })
        }
    }
}

export default Producto