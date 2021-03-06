const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {

    async login(req,res) {
        // #swagger.tags = ['Auth']
        // #swagger.description = 'Uma rota que retorna para realizar o Login e obter o token JWT'
        try {
            const userResult = await User.findOne({
                where:{
                    email: req.body.email,
                }
            });
            if(userResult != null){
                const match = await bcrypt.compare(req.body.password, userResult.password);
                if(match){
                    const token = jwt.sign({id: userResult.id}, process.env.ACCESS_SECRET,
                    {
                            expiresIn: 1500
                    })
                    return res.status(200).json({
                        auth: true,
                        token: token
                    });
                }
                else{
                    return res.status(401).json({error: "Usuário e/ou Senha Inválidos"});
                }
            }
            else{
                return res.status(401).json({error: "Usuário e/ou Senha Inválidos"});
            }

            return res.status(200).json(UsersResult);
        }
        catch(err) {
            return res.status(400).json({error: err.message});
        }
    }
}
module.exports = new UserController();