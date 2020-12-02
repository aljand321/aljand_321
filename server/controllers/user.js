import model from '../models';

const { User } = model;
const { Book } = model;

class Users {
    static signUp(req, res) {
        const { name, username, email, password } = req.body
        return User
            .create({
                name,
                username,
                email,
                password
            })
            .then(userData => res.status(201).send({
                success: true,
                message: 'User successfully created',
                userData
            }))
    }
    static listUserBook(req,res){
        return User
        .findAll({
            include :[{
                model: Book
            }]
        }).then(data => {
            res.status(200).json({
                msg:"User Book",
                data
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                msg:"Error al mostrar los datos"
            })
        })
    }
}

export default Users;