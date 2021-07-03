const { User } = require('../models');
const bcrypt = require('bcrypt');

class UserController {
    /* definir métodos */

    async getAll(req,res) {
        try {
            const UsersResult = await User.findAll({              
            });
            return res.status(200).json(UsersResult);
        }
        catch(err) {
            return res.status(400).json({error: err.message});
        }
    }

    async getById(req,res) {
        try {
            const UsersResult = await User.findById(req.body.id);
            return res.status(200).json(UsersResult);
        }
        catch(err) {
            return res.status(400).json({error: err.message});
        }
    }

    async create(req,res) {
        try {
            const passwordHash = await bcrypt.hash(req.body.password, 8)
            //userType = 1 (Organizador)
            //userType = 2 (Corredor)
            let user = {
                    name: req.body.name,
                    email: req.body.email,
                    userType: req.body.userType,
                    password: passwordHash
                };
                const userResult = await User.create(user);                
                return res.status(200).json(userResult);
            }
        catch(err) {
            return res.status(400).json({error: err.message});
        }
    }
}
module.exports = new UserController();