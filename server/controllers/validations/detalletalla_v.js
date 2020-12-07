import model from '../../models';
const { Productos } = model
const { DetalleTalla } = model;

class ValidationDetalleTalla {
    static async createDetalleProducto(descripcion, cantidad, presioEntrada, precioSalida, id_producto, id_talla) {
        console.log(descripcion, cantidad, presioEntrada, precioSalida, id_producto, id_talla);
        var t_E = presioEntrada * cantidad;
        var t_S = precioSalida * cantidad;
        var g = t_S - t_E;
        try {
            const data = await DetalleTalla.create({
                descripcion,
                cantidad,
                presioEntrada,
                precioSalida,
                totalEntrada: t_E,
                totalSalida: t_S,
                ganancia: g,
                id_producto,
                id_talla
            });
            return data
        } catch (error) {
            console.log(error)
            return "No se pudieron crear los datos"
        }



    }
    static async sacarCantiadProducto(id_producto) {
        try {
            const producto = await Productos.findOne({
                where: { id: id_producto },
                attributes: ['cantidad']
            });
            return producto.cantidad;
        } catch (error) {
            console.log(error);
            return "Error no se puede mostrar la cantidad del producto"
        }
    }
    static async Verificar(id_producto) {
        try {
            const data = await DetalleTalla.findAll({
                where: { id_producto }
            })
            if (data == '') {
                return false
            } else {
                return true
            }

        } catch (error) {
            console.log(error);
            return "Error no se puede mostrar la cantidad del producto"
        }
    }
    static async verficarC_P(cantidad, cantidadProductos, id_producto) {
        try {
            var cant = 0;
            const list = await DetalleTalla.findAll({ where: { id_producto }, attributes: ['cantidad'] });

            for (var i = 0; i < list.length; i++) {
                cant = list[i].cantidad + cant;
            }
            var C_v = (cantidadProductos - cant) * 1
            var msg = [
                { succes: true, msg: "Se crearon los datos" },
                { succes: false, msg: "cantidad exedida: De este producto queda " + C_v + " para registrar " },
                { succes: false, msg: "La cantidad no puede ser 0 al" }
            ]
            //console.log(C_v, " <<<<<<<<<<< ", cantidad, cantidadProductos,cant);            
            if (cantidad <= C_v && cantidad > 0) {
                return msg[0]
            } else {
                if (cantidad >= C_v) {
                    return msg[1]
                } else {
                    return msg[2]
                }
            }
        } catch (error) {
            console.log(error);
            return "no se puede sacar los datos de la tabla detalles tallas"
        }
    }
    static async verifiTallaExist(id_producto, id_talla) {
        const verificarTallaExistencia = await DetalleTalla.findOne({ where: { id_producto: id_producto, id_talla: id_talla } })
        if (verificarTallaExistencia) {
            return true
        } else {
            return false
        }
    }
}
export default ValidationDetalleTalla