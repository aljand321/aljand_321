import model from '../models';
import fechasproductos from '../models/fechasproductos';

import ValidationProductos from './validations/validationProductos';

const { Productos } = model;

class Producto {
    static async create(req, res) {
        const { descripcion, cantidad, id_marca, id_tipo, id_almacen, FechaRegistro, precioTotal } = req.body;

        const tamanio = await ValidationProductos.verfiTamanio(id_almacen);
        
        const verfiTamanio = await ValidationProductos.validarTamanio(tamanio,id_almacen,cantidad);
        
        if (verfiTamanio.success){
            if(FechaRegistro == "" || FechaRegistro == null) return res.status(400).json({ msg:"Porfavor inserte fecha de registro", success:false });
            if(precioTotal == "" || precioTotal == null) return res.status(400).json({ msg:"Inserte el costo que tienen la cantidad de prodcutos", success:false });

            const createProducto = await ValidationProductos.createProducto(descripcion, cantidad, id_marca, id_tipo, id_almacen);
            if(createProducto.success == false) return res.status(400).json({ msg:createProducto.msg });

            const fecahData = await ValidationProductos.regsiterFechaProducto(descripcion,FechaRegistro,cantidad,precioTotal, createProducto.resp.id);
            if (fecahData.success == false ) return res.status(400).json(fecahData.msg);

            if(createProducto.success == true)  return res.status(200).json({msg:createProducto.msg, data:createProducto.resp});

        }else{
            res.status(400).json({
                msg:verfiTamanio.msg
            })
        }       
    }
    static async pruebas(req, res) {
        const { id_almacen } = req.params;        
        res.status(200).json(data);

    }
    static async list(req, res) {
        try {
            const resp = await Productos.findAll();
            res.status(200).json({
                msg: "Lista de Productos o ropas",
                resp
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "no se puede mostrar los datos"
            });
        }
    }
    static async delteAll(req,res){
        try {
            const data = await Productos.findAll();
            for(var i = 0; i < data.length; i++){
                const deleteData = await Productos.findByPk(data[i].id);
                //console.log(data[i].id, ' = ',deleteData.descripcion);
                await deleteData.destroy();
            }
            res.status(200).json({
                msg:"SE eliminaron todos los datos",
                data
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg:"No se puedo eliminar los datos"
            });
        }
    }
}

export default Producto