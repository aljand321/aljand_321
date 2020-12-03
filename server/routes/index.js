import Users from '../controllers/user';
import Books from '../controllers/book';

import Admin from '../controllers/admin';
import Tiendas from '../controllers/tienda';

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
};