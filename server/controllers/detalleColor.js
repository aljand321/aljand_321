import model from '../models';

import ValidatioDetalleColr from './validations/detalleColor';

const { detalleColor } = model;
const { DetalleTalla } = model;

//colores de las tallas
class ColorDetalle {
    static async create(req, res) {
        // es este registro se mandara el id de detalle talla en los params y el id de color atrabes de post
        const { descripcion, cantidad, id_color } = req.body;
        const { id_detalle_talla } = req.params;
        
        const cantidadTalla = await ValidatioDetalleColr.cantidadTalla(id_detalle_talla);
        const existeDetalleTalla = await ValidatioDetalleColr.verificarRegistroDetalleColor(id_detalle_talla);
        const verificarColor = await ValidatioDetalleColr.verificarColor(id_detalle_talla,id_color);

        if(verificarColor == true){
            res.status(400).json({
                msg:"ese color ya esta registrado para ese producto "
            })
        }else{
            const verificarCantidad = await ValidatioDetalleColr.verificar(id_detalle_talla,id_color,cantidad,descripcion,cantidadTalla);   
            res.status(200).json({
                cantidadTalla,
                verificarCantidad,
                existeDetalleTalla
            });
        }        
    }
    static async list(req, res) {
        try {
            const data = await detalleColor.findAll();
            res.status(200).json({
                mag:"Tabla colores",
                data
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                msg:"Error no se puede mostrar los datos"
            })
        }
    }
}

export default ColorDetalle;