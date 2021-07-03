const jwt = require('jsonwebtoken');

let verificar = function verificarJWT(roles) {
     return (req,res,next) => {
        //console.log(roles);
        //console.log(req.headers);
        let token = req.headers['authorization'];
        let tokens = token.split(' ');
        token = tokens[1];
        if (!token) return res.status(401).json({mensagem: "Não autorizado"});
    
        jwt.verify(token, process.env.ACCESS_SECRET, function(erro,decoded) {
            if (erro) return res.status(400).json({mensagem: "Não autorizado", "err": erro});            
            req.user = decoded;             
            let valido = false;
            roles.forEach(role => {
                if (role == req.user.userType) { 
                    valido = true
                }
            });
            if (!valido) return res.status(401).json({mensagem: "Usuário não tem nível de acesso para essa rota"});            
            next();
        })
    }
}

module.exports = verificar;