const jwt = require('jsonwebtoken');
const { User } = require('../models');

let verificar = function verificarJWT(roles) {
     return (req,res,next) => {
        //console.log(roles);
        //console.log(req.headers);
        let token = req.headers['authorization'];
        let tokens = token.split(' ');
        token = tokens[1];
        if (!token) return res.status(401).json({mensagem: "Não autorizado"});
    
        jwt.verify(token, process.env.ACCESS_SECRET, async function(erro,decoded) {
            if (erro) return res.status(400).json({mensagem: "Não autorizado", "err": erro});            
            req.user = decoded;
            const user = await User.findByPk(req.user.id)
            console.log(user)           
            let valido = false;
            roles.forEach(role => {
                if (role == user.userType) { 
                    valido = true
                }
            });
            if (!valido) return res.status(401).json({mensagem: "Usuário não tem nível de acesso para essa rota"});            
            next();
        })
    }
}

let verificarAcessoUsuario = function verificarUsuario() {
    return (req,res,next) => {
       let token = req.headers['authorization'];
       let tokens = token.split(' ');
       token = tokens[1];
       if (!token) return res.status(401).json({mensagem: "Não autorizado"});
   
       jwt.verify(token, process.env.ACCESS_SECRET, function(erro,decoded) {
           if (erro) return res.status(400).json({mensagem: "Não autorizado", "err": erro});            
           req.user = decoded;             
           let valido = false;

            if (req.params.id == req.user.id) { 
                valido = true
            }

           if (!valido) return res.status(401).json({mensagem: "Usuário não tem nível de acesso para essa rota"});            
           next();
       })
   }
}

module.exports = {verificar, verificarAcessoUsuario};