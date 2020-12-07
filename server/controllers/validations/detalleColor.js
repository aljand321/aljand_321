import model from '../../models';

const { detalleColor } = model;
const { DetalleTalla } = model;

class ValidatioDetalleColr {
    static async cantidadTalla(id_detalle_talla){
        try {
            const cantidadTalla = await DetalleTalla.findOne({ where: { id: id_detalle_talla }, attributes: ['cantidad'] });
            return cantidadTalla.cantidad
        } catch (error) {
            console.log(error);
            return 'No se pude mostrar los datos '
        }
    }
    static async verificarRegistroDetalleColor(id_detalle_talla){
        // mostrar si un detalle talla ya esta registrado o no esta registrado
        try {
            const data = await detalleColor.findAll({
                where :{ id_detalle_talla }
            })
            //console.log(data);
            if (data == ''){
                return false
            }else{
                return true
            }
        } catch (error) {
            console.log(error)
            return 'no se puede mostrar los datos de detalle color'
        }
    }
    static async verificar(id_detalle_talla,id_color,cantidad,descripcion,cantidadTalla){
        //verificar la cantidad que no sea 0 y que no exeda a la cantidad de la anterior tabla
        try {
            var cant = 0
            const list = await detalleColor.findAll({
                where: {id_detalle_talla},
                attributes: ['cantidad']
            });
            for (var i = 0; i < list.length; i++){
                cant = list[i].cantidad + cant
            }
            var c_v = cantidadTalla - cant
            var msg = [
                { succes: true, msg: "Se crearon los datos" },
                { succes: false, msg: "cantidad exedida: De este producto queda " + c_v + " para registrar " },
                { succes: false, msg: "La cantidad no puede ser 0 al" }
            ]
            if (cantidad <= c_v && cantidad > 0){
                const data = await detalleColor.create({
                    descripcion,
                    cantidad,
                    id_detalle_talla,
                    id_color
                })
                
                return msg[0];
            }else{
                if(cantidad >= c_v){
                    return msg[1];
                }else{
                    return msg[2];
                }
            }
        } catch (error) {
            console.log(error);
            return 'No se puede crear los datos'
        }
    } 
    static async verificarColor (id_detalle_talla,id_color){
        try {
            const data = await detalleColor.findOne({
                where:{id_detalle_talla,id_color}
            });
            console.log(data, " esto es ");
            if (data){
                return true
            }else{
                return false
            }
        } catch (error) {
            console.log(error);
            return 'No se puede verifacar si existe ese color en ese producto'
        }
    }
}

export default ValidatioDetalleColr