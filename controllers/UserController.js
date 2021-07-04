const { User } = require('../models');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");

class UserController {
    
    // #swagger.tags = ['User']
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

    // #swagger.tags = ['User']
    async getById(req,res) {
        try {
            const user = await User.findByPk(req.params.id);
            if(user){
                return res.status(200).json(user);
            }
            else{
                return res.status(404).json({mensagem: "Usuário não encontrado"})
            }
        }
        catch(err) {
            return res.status(400).json({error: err.message});
        }
    }

    // #swagger.tags = ['User']
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

    // #swagger.tags = ['User']
    async update(req,res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                const passwordHash = await bcrypt.hash(req.body.password, 8)
                let userUpdate = {
                    name: req.body.name,
                    email: req.body.email,
                    userType: req.body.userType,
                    password: passwordHash
                };
                await user.update(userUpdate);
                return res.status(200).json(user);
            }
            else {
                return res.status(401).json({mensagem: "Usuário não encontrado"});
            }
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    // #swagger.tags = ['User']
    async delete (req,res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {                
                await user.destroy();
                return res.status(200).json(user);
            }
            else {
                return res.status(404).json({mensagem: "Usuário não encontrado"});
            }
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    // #swagger.tags = ['User']
    async getAllByName (req,res) {
        let name = '%' + req.query.name + '%';
        try {
            const users = await User.findAll({
                where: {
                    name: {
                        [Op.like]: name
                    }
                }
            });

            if (users)
                return res.status(200).json(users);
            else
                return res.status(401).json({mensagem: "Não foram encontrados usuários com esse nome"})
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }
}
module.exports = new UserController();