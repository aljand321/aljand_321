import model from '../models';
const Sequelize = require('sequelize');
const op = Sequelize.Op;

const { Ventas } = model;
const { Almacen } = model;
const { Productos } = model;
const { Talla } = model;
const { DetalleTalla } = model;
const { detalleColor } = model;
const { precios } = model;
const { tallasVendidas } = model;
const { Vendedor } = model;

async function getVendedor(id_vendedor){
    try {
        const data = await Vendedor.findOne({
            where:{id:id_vendedor}
        })
        if(data == null || data == "") return { success:false, msg:"El vendedor no existe" }
        return {success:true, msg:"Vendedor... ", data}
    } catch (error) {
        console.log(error);
        return { success:false, msg:"No existe ese vendedor" }
    }
}

class Venta {
    static async create(req, res) {
        //ver si esta registrado una talla o un color del producto para poder hacer una venta 
        //la tabla detalle talla esta mal por que los precios no van en esa tabla
        const { descripcion, cantidad, descuento, id_producto, id_talla, id_color } = req.body;
        const { id_vendedor } = req.params;
        const vendedor = await getVendedor(id_vendedor);
        if(vendedor.success == false) return res.status(400).json(vendedor);
        const cantidades = await sacarCantidades(id_producto, id_talla, id_color);
        
        if (cantidades.cantidaddetalleColor < 0) return res.status(400).json("Ya no hay ese color para vender")
        if (cantidades.detalleTalla < 0) return res.status(400).json("Ya no hay essa talla de ese producto")
        if (cantidades.productoCantidad < 0) return res.status(400).json("El producto ya no existe")
        if (cantidad > cantidades.cantidaddetalleColor) return res.status(400).json("Cantidad exedida para los colores de ese producto solo queda"+ cantidades.cantidaddetalleColor)

        const precio_producto = await precioProducto(id_producto,id_talla,cantidad);
        if (precio_producto.success == false) return res.status(500).json(precio_producto)
        var precio_Total = (precio_producto.data * cantidad) - descuento;
       
        
        
        if (cantidad <= 0) {
            return res.status(400).json({
                msg: "La cantidad no puede ser 0 o menor a 0"
            });
        } else {
            try {
                const dataFProduc = await r_c_t_productos(id_producto,id_talla, id_color,cantidad);
                const dataFDetalleT = await r_c_detalleT(id_producto,id_talla,id_color,cantidad);
                //console.log(descripcion, cantidad, descuento, id_producto, id_talla,precio_producto);
                if (dataFProduc.success == false) return res.status(500).json(dataFProduc.msg);
                if (dataFDetalleT.success == false) return res.status(500).json(dataFDetalleT.msg);
                const data = await Ventas.create({
                    descripcion,
                    cantidad,
                    precioSalida: precio_producto.data,
                    descuento,
                    total: precio_Total,
                    id_producto,
                    id_talla,
                    id_vendedor,
                    id_color
                });
                res.status(200).json({
                    msg: "Se crearon los datos en la tabla ventas",
                    precio_Total
                })
                
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    msg: "No se puede crear lo datos"
                })
            }
        }
    }
    static async list(req, res) {
        try {
            const data = await Ventas.findAll();
            res.status(200).json({
                msg: "Table de ventas",
                data
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "No se puede mostrar los datos de la tabal ventas"
            })
        }
    }
    //esta funcion es de prueba para mostrar lo que queria ahora solo falta sacar el id de detalle talla
    //para poder sacar de la tabla datelle color tmb se necesita el id del color para poder sacar la cantidad de esa tabla
    static async mostrarCantidades(req,res){
        const { id_producto,id_talla,id_color } = req.params;
        
        try {
            const mostrar = await Productos.findOne({
                where:{id:id_producto},
               attributes:['id','id_almacen','cantidad'],
                include : [
                    {
                        model:DetalleTalla,
                        attributes:['id','cantidad'],
                        where:{ [op.and]: [{ id_producto }, { id_talla }] }
                    }   
                ]
            });
            const cantidadAlmacen = await sacarCantidadAlmacen(mostrar.id_almacen)
            const cantidaddetalleColor = await sacarCantidadDetalleColor(mostrar.DetalleTallas[0].id, id_color);
            if (cantidadAlmacen.success == false) return res.status(500).json(cantidadAlmacen.msg);
            if (cantidaddetalleColor.success == false) return res.status(500).json(cantidaddetalleColor.msg);
            return res.status(200).json({
                msg:"los datos ",
                id_almacen:mostrar.id_almacen,
                cantidadAlmacenDisponible:cantidadAlmacen.cantidad,
                productoCantidad:mostrar.cantidad,
                detalleTalla:mostrar.DetalleTallas[0].cantidad,
                cantidaddetalleColor:cantidaddetalleColor.cantidad                
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg:"No se puede mostrar los datos de las tablas"
            })
        }
    }

    //pruebas funciones
    static async preciosPrueb(req,res){
        const { id_producto, id_talla } = req.params;
        const data = await precioProducto(id_producto, id_talla);
        if (data.success == false) return data
        res.status(200).json(data);
    }
    static async getTallasVendidas(req,res){
        const data = await tallasVendidas.findAll();
        res.status(200).json(data)
    }
}

async function precioProducto(id_producto, id_talla, cantidadVendido) {
    //console.log(id_producto, id_talla, " <<< z<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    try {
        const data = await DetalleTalla.findOne({
            where: { [op.and]: [{ id_producto }, { id_talla }] },
            attributes: ['id','id_precios'],
            include:[
                {
                    model: precios
                }
            ]
        });
        //console.log(data)
        const dataTallaV = await tallasVendido(data.id,data.id_precios,cantidadVendido)
        if (dataTallaV.success == false) return { success:false, msg:dataTallaV.msg }
        return { success:true, msg:"Precio del producto ", data:data.precio.precio_salida };
    } catch (error) {
        console.log(error);
        return { success:false, msg:"No se puede sacar el precio del producto" };
    }
}
// añadir a la tabla tallas vendidas si es que no existe el id de talla y el id precio si existe actualice sume la cantidad
// de productos vendidos
async function getTallaVendida(id_detalle_talla,id_precios){
    try {
        const data  = await tallasVendidas.findOne({
            where: {[op.and]: [{ id_detalle_talla }, { id_precios }]}
        })
        return { success:true, msg:"talla vendida", data  }
    } catch (error) {
        console.log(error);
        return { success:false, msg:"no se puede sacar los datos de la tabla talla vendidas" }
    }
}
async function tallasVendido(id_detalle_talla,id_precios,cantidadVendido){
    console.log(id_detalle_talla,id_precios,cantidadVendido, " <<<<<<<<<<<<<<<<<")
    const data = await getTallaVendida(id_detalle_talla,id_precios);
    if (data.success == false) return { success:false, msg: data.msg }
    if (data.data == "" || data.data == null){    
        try {
            const data = await tallasVendidas.create({
                cantidad: cantidadVendido,
                id_detalle_talla ,
                id_precios
            })
            return { success:true, msg:"Se inserto los datos en la tabla tallas vendidas", data }
        } catch (error) {
            console.log(error);
            return { success:false, msg:"No se puede insertar en la tabla tallas vendidas" }
        }   
    
    }else{
        var cant = data.data.cantidad + (cantidadVendido * 1 )
        console.log(data.data.cantidad, cantidadVendido, "zzzzzzzzzzzzzzzzzzzzzzz")
        try {
            const resp = await tallasVendidas.findOne({
                where: {[op.and]: [{ id_detalle_talla }, { id_precios }]}
            })
            
            const dataUpdate = await resp.update({
                cantidad: cant 
            });
           
            return { success:true, msg:"Se actualizo la venta", dataUpdate }
            
        } catch (error) {
            console.log(error);
            return { success:false, msg:"No se puede actualizar la cantidad en la tabla talla vendidas" }
        }
    }
    
}

async function sacarCantidadAlmacen(id_almacen){
    try {
        const data = await Almacen.findOne({
            where:{id:id_almacen},
            attributes:['cantidadDisponible']
        });
        return { succes:true, msg:"Datos del almacen",cantidad:data.cantidadDisponible }
    } catch (error) {
        console.log(error);
        return { success:false, msg:"No se puede mostrar los datos de almacen" }
    }
}
//sacar cantidad de las tablas productos detalle talla detalle color

async function sacarCantidadDetalleColor(id_detalle_talla,id_color){
    try {
        const data = await detalleColor.findOne({
            where:{ [op.and]: [{ id_detalle_talla }, { id_color }] },
            attributes:['cantidad']
        })
        return { succes:true, msg:"Datos de detalle color", cantidad:data.cantidad }
    } catch (error) {
        console.log(error);
        return { success:false, msg:"No se puede mostrar los datos de la tabla detalle color" }
    }
}
async function sacarCantidades(id_producto,id_talla,id_color){
    try {
        const mostrar = await Productos.findOne({
            where:{id:id_producto},
           attributes:['id','id_almacen','cantidad'],
            include : [
                {
                    model:DetalleTalla,
                    attributes:['id','cantidad'],
                    where:{ [op.and]: [{ id_producto }, { id_talla }] }
                }   
            ]
        });
        const cantidadAlmacen = await sacarCantidadAlmacen(mostrar.id_almacen)
        const cantidaddetalleColor = await sacarCantidadDetalleColor(mostrar.DetalleTallas[0].id, id_color);
        if (cantidadAlmacen.success == false) return { success:false, msg:cantidadAlmacen.msg };
        if (cantidaddetalleColor.success == false) return { success:false, msg:cantidaddetalleColor.msg };
        return { 
            success:true, 
            id_almacen:mostrar.id_almacen,
            msg:"Cantidades de las tablas almacen, productos, detalle talla, detalle color", 
            cantidadAlmacenDisponible:cantidadAlmacen.cantidad,
            productoCantidad:mostrar.cantidad,
            detalleTalla:mostrar.DetalleTallas[0].cantidad,
            cantidaddetalleColor:cantidaddetalleColor.cantidad      
        };
    } catch (error) {
        console.log(error);
        return { success:false, msg:"No se puede mostrar las cantidades" }
    }

}
//funcoines reducir cantidad tabla productos

async function r_c_t_productos(id_productos,id_talla,id_color,cantidad) {
    const cantidadProductos = await sacarCantidades(id_productos,id_talla,id_color)
    
    var msg = [
        {success:false, msg:"No se actualizo la cantidad en la tabla productos"},
        {success:true, msg:"Se actualizo la cantidad en la tabla productos"}
    ]
    if(cantidadProductos.success == false) return { success:false, msg:cantidadProductos.msg };
    try {
        const updateProduct = await Productos.findByPk(id_productos);
        const dataUpdate = await updateProduct.update({
            cantidad : cantidadProductos.productoCantidad - cantidad
        });
        console.log(cantidadProductos.productoCantidad, cantidad, " esto es lo que quiero ver <<<<<<<<<<<<<<<<<<<<")
        return msg[1]
    } catch (error) {
        console.log(error);
        return msg[0]
    }
}

async function r_c_detalleT (id_producto, id_talla, id_color, cantidad){
    const cantidadDetalletalle = await sacarCantidades(id_producto,id_talla,id_color)
    var msg = [
        {success:false, msg:"No se actualizo la cantidad en la tabla detalle tallas"},
        {success:true, msg:"Se actualizo la cantidad en la tabla detalle talla"}
    ]
    if(cantidadDetalletalle.success == false) return { success:false, msg:cantidadDetalletalle.msg };
    try {
        const updateDetalleTabla = await DetalleTalla.findOne({
            where: { [op.and]: [{ id_producto }, { id_talla }] },
        });
        const dataUpdate = await updateDetalleTabla.update({
            cantidad: cantidadDetalletalle.detalleTalla - cantidad
        });
        const dataDetalleColor = await r_c_detalleC(dataUpdate.id,id_color,cantidad,id_producto,id_talla);
        const updateAlmacen = await liberarEspacio(cantidadDetalletalle.id_almacen,cantidad,cantidadDetalletalle.cantidadAlmacenDisponible);
        if(updateAlmacen.success == false) return updateAlmacen
        if(dataDetalleColor.success){
            //console.log(dataUpdate)
            return msg[1];
        }else{
            return dataDetalleColor
        }
        
    } catch (error) {
        console.log(error);
        return msg[0];
    }

}

async function r_c_detalleC(id_detalle_talla, id_color, cantidad,id_productos,id_talla){
    const cantidadDetalleColor = await sacarCantidades(id_productos,id_talla,id_color)
    var msg = [
        {success:false, msg:"No se actualizo la cantidad en la tabla detalle color"},
        {success:true, msg:"Se actualizo la cantidad en la tabla detalle color"}
    ]
    if(cantidadDetalleColor.success == false) return { success:false, msg:cantidadDetalleColor.msg };
    try {
        const updateDetalleTabla = await detalleColor.findOne({
            where: { [op.and]: [{ id_detalle_talla }, { id_color }] },
        });
        const dataUpdate = await updateDetalleTabla.update({
            cantidad : cantidadDetalleColor.cantidaddetalleColor - cantidad
        });
        //console.log(dataUpdate)
        return msg[1];
    } catch (error) {
        console.log(error);
        return msg[0];
    }

}

async function liberarEspacio(id_almacen,cantidad,cantidadDisponible){
    console.log("esto es la cantidad disponible en almacen ", cantidadDisponible, "cantidad que se manda", cantidad);
    try {
        const data = await Almacen.findByPk(id_almacen);
        const dataupdate = await data.update({
            cantidadDisponible : (cantidadDisponible*1) + (cantidad*1)
        })
        return { success:true, msg:"se actualizo los datos en almacen", dataupdate }
    } catch (error) {
        console.log(error);
        return { success:false, msg:"No se puede actualizar en almacen" }
    }    
}

export default Venta