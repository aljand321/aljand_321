import model from '../../models';
import Producto from '../productos';

const { Productos } = model;
const { Almacen } =  model;
const { FechasProductos } = model;

class ValidationProductos {

    static async verfiTamanio(id_almacen){
        try {
            const tamanio = await Almacen.findOne({
                where:{id:id_almacen},
                attributes:['tamanio']
            })
            return tamanio.tamanio;
        } catch (error) {
            console.log(error);
            return 'No se puede mostrar los datos'
        }
    }
    static async validarTamanio(tamanio,id_almacen,cantidad){        
        var cant = 0;
        const list = await Productos.findAll({
            where:{id_almacen},
            attributes:['cantidad']
        });
        for (var i = 0; i < list.length; i++){
            cant = list[i].cantidad + cant;
        };
        var c_v = tamanio - cant;
        
        var msg = [
            {success:true, msg:"se crearon los datos"},
            {success:false, msg:"La cantidad no puede ser 0"},
            {success:false, msg:"Cantidad exedida para ese lugar, solo soporta "+ c_v},
            {success:false, msg:"No se pudo actualizar el tamanio total del almacen"}
        ];
        if (cantidad > c_v) return msg[2]; 
        const dataFUpdateCantidad = await updateCantidadDisponible(id_almacen, (c_v-cantidad));
        if (dataFUpdateCantidad.success == false) return msg[3];
        if (cantidad <= c_v && cantidad > 0) return msg[0];
        if (cantidad <= 0) return msg[1];                        
    }
    static async createProducto(descripcion, cantidad, id_marca, id_tipo, id_almacen){
        try {
            const resp = await Productos.create({
                descripcion, cantidad, id_marca, id_tipo, id_almacen
            });
            return { msg:"Se crearon los datos", success:true, resp }
        } catch (error) {
            console.log(error);
            return { msg:"No se puede regsitrar en productos", success:false }
        }
    }
    static async regsiterFechaProducto(descripcion,FechaRegistro,cantidad,precioTotal,id_producto){
        try {
            const data = await FechasProductos.create({
                descripcion,
                FechaRegistro,
                cantidad,
                precioTotal,
                id_producto
            })
            return { msg:"Se registro el producto en la tabla fechas", success:true, data }
        } catch (error) {
            console.log(error);
            return { msg:"No se puede registrar en tabla fechas", seccuess:false }
        }
    }
}   

async function updateCantidadDisponible(id_almacen, cantidadTotal){
    console.log(id_almacen, cantidadTotal);
    try {
        const dataUpdate = await Almacen.findOne({
            where:{id:id_almacen}
        });
        const update = await dataUpdate.update({
            cantidadDisponible: cantidadTotal
        });
        return { success:true, msg:"Se actualizo el tamanio del almacen", update };
    } catch (error) {
        console.log(error);
        return {success:false, msg:"No se pudo actualizar el tamanio total del almacen"}
    }
}

async function regsiterFechaProducto(){
    
}

export default ValidationProductos;