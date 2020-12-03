import model from '../models';

import ValidationDetalleTalla from './validations/detalletalla_v'

const { DetalleTalla } = model;
const { Productos } = model

class DetalleTallaP{
    static async create(req,res){
        const { descripcion,cantidad,presioEntrada,precioSalida,totalEntrada,totalSalida,ganancia } = req.body;
        const { id_producto, id_talla } = req.params;
        const cantidadProductos = await ValidationDetalleTalla.sacarCantiadProducto(id_producto);
        const verificar = await ValidationDetalleTalla.Verificar(id_producto);  
        const verificarcantidad = await ValidationDetalleTalla.VerificarCantidad( {cantidad,cantidadProductos})
        console.log(cantidadProductos)      
        //res.status(200).json(verificar)
        
        try {           
            if ( verificarcantidad.succes && verificar == false){                
                /* const data = await  DetalleTalla.create({
                    descripcion,cantidad,presioEntrada,precioSalida,totalEntrada,totalSalida,ganancia,id_producto, id_talla
                }); */                
                return res.status(200).json({
                    msg:verificarcantidad.msg,
                    
                })
            }else{
                res.status(400).json({msg: verificarcantidad.msg})
            }           
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg:"no se puede crear los datos"
            })
        }
    }
    static async list(req,res){
        try {
            const resp = await DetalleTalla.findAll();
            res.status(200).json({
                msg:"Lista de Productos o ropas",
                resp
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg:"no se puede mostrar los datos"
            })
        }
    }

    static async delete(req,res){
        try {
            const resp = await DetalleTalla.findByPk(req.params.id);
            await resp.destroy();
            res.status(200).json({
                msg:"detalle talla elminado",
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

export default DetalleTallaP