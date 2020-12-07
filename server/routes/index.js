import Users from '../controllers/user';
import Books from '../controllers/book';

import Admin from '../controllers/admin';
import Tiendas from '../controllers/tienda';
import Vendedors from '../controllers/vendedor';
import Almacens from '../controllers/almacen';
import TipoRopa from '../controllers/tipo';
import MarcaRopa from '../controllers/marca';
import ColorRopa from '../controllers/color';
import TallaRopa from '../controllers/talla';
import Producto from '../controllers/productos';
import DetalleTallaP from '../controllers/detalleTalla';

import ColorDetalle from '../controllers/detalleColor';



export default (app) => {

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the BookStore API!',
  }));

  app.post('/api/users', Users.signUp); // API route for user to signup
  app.get('/api/UserBooks', Users.listUserBook);
  //books
  app.post('/api/users/:userId/books', Books.create); // API route for user to create a book
  app.get('/api/books', Books.list); // API route for user to get all books in the database
  app.put('/api/books/:bookId', Books.modify); // API route for user to edit a book
  app.delete('/api/books/:bookId', Books.delete); // API route for user to delete a book

  app.get('/api/list2/:id', Books.list2);

  app.get('/userBooks2', Books.userBooks);

  //rutas administrador

  // /admin/api/
  app.post('/admin/api/', Admin.createAdmin);
  app.get('/admin/api/', Admin.listAdmin);
  app.get('/adminTeindas/api/', Admin.AdminTiendas);

  // /tiendas/api/
  app.post('/tiendas/api/:id_admin', Tiendas.createTienda);
  app.get('/tiendas/api/', Tiendas.listTiendas);

  // /vendedor/api/
  app.post('/vendedor/api/:id_tienda', Vendedors.createVendedor );
  app.get('/vendedor/api/', Vendedors.listVendedores);
  app.delete('/vendedor/api/:id', Vendedors.deleteV);

  // //almacen/api/
  app.post('/almacen/api/:id_tienda', Almacens.createAlmacen );
  app.get('/almacen/api/', Almacens.list);

  // /tipo/api/
  app.post('/tipo/api/', TipoRopa.create);
  app.get('/tipo/api/', TipoRopa.list);

  // /marca/api/
  app.post('/marca/api/', MarcaRopa.create);
  app.get('/marca/api/', MarcaRopa.list);

  // /color/api/
  app.post('/color/api/', ColorRopa.create);
  app.get('/color/api/', ColorRopa.list);

  // /talla/api/
  app.post('/talla/api/', TallaRopa.create);
  app.get('/talla/api/', TallaRopa.list);

  // /producto/api/
  app.post('/producto/api/', Producto.create);
  app.get('/producto/api/', Producto.list);

  app.get('/producto/api/:id_almacen', Producto.pruebas);

  // /detalleTalla/api/
  app.post('/detalleTalla/api/:id_producto/:id_talla', DetalleTallaP.create);
  app.get('/detalleTalla/api/', DetalleTallaP.list);
  app.delete('/detalleTalla/api/:id', DetalleTallaP.delete);

  // /detalleColor/api/
  app.post('/detalleColor/api/:id_detalle_talla', ColorDetalle.create);
  app.get('/detalleColor/api/', ColorDetalle.list);
};