import model from '../models';

const { Book } = model;
const { User } = model;

class Books {
    static create(req, res) {
        const { title, author, description, quantity } = req.body
        const { userId } = req.params
        return Book
            .create({
                title,
                author,
                description,
                quantity,
                userId
            })
            .then(book => res.status(201).send({
                message: `Your book with the title ${title} has been created successfully `,
                book
            }))
    }
    static list(req, res) {
        return Book
            .findAll()
            .then(books => res.status(200).send(books))
            .catch(error => {
              console.log(error)
              res.status(500).json({msg:"Error"})
            })
    }
    static async list2(req,res){
      const {id} = req.params
      var data1
      try {
        const data = await Book.findOne({
          where: {id:id}
        });
        data1 = data
      } catch (error) {
        console.log(error);
        res.status(500).json({
          msg:"error no se pudo traer los datos"
        })
      }finally{
        console.log(data1, "esto es <<<<<<<<<<<<<<");
        if(data1 == null ){
          return res.status(400).json({
            msg:"ese libro no esta existe"
          })
        }
          res.status(200).send(data1);

        
      }
    }
    static async userBooks(req,res){
      const data = await Book.findAll()
      
      var can = []
      
      for (var i = 0; i < data.length; i++){
        if (data[i].quantity == 16){
          can.push({
            name:  data[i].title
          })
        }
      }
      res.status(200).json({
        msg:"esto es ",
        can
      }) 
    }
    static modify(req, res) {
        const { title, author, description, quantity } = req.body
        return Book
          .findByPk(req.params.bookId)
          .then((book) => {
            book.update({
              title: title || book.title,
              author: author || book.author,
              description: description || book.description,
              quantity: quantity || book.quantity
            })
            .then((updatedBook) => {
              res.status(200).send({
                message: 'Book updated successfully',
                data: {
                  title: title || updatedBook.title,
                  author: author || updatedBook.author,
                  description: description || updatedBook.description,
                  quantity: quantity || updatedBook.quantity
                }
              })
            })
            .catch(error => {
                console.log(error);
                res.status(400).send(error);
            });
          })
          .catch(error => {
            console.log(error);
            res.status(400).send(error);
        });
      }
      static delete(req, res) {
        return Book
          .findByPk(req.params.bookId)
          .then(book => {
            if(!book) {
              return res.status(400).send({
              message: 'Book Not Found',
              });
            }
            return book
              .destroy()
              .then(() => res.status(200).send({
                message: 'Book successfully deleted'
              }))
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error))
      }
}

export default Books