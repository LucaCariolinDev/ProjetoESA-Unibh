const { Router } = require('express');
const UserController = require("../controllers/UserController");
const AtorController = require("../controllers/AtorController");
const AuthController = require("../controllers/AuthController");
const verificar = require('../middlewares/autenticacao');
const routes = Router();

routes.get('/', (req,res) => {
    // #swagger.tags = ['ROTA PRINCIPAL']
    // #swagger.description = 'Uma rota que retorna um Hello World'

    /* #swagger.responses[200] = {
        schema: { mensagem: 'Hello World' },
        description: 'Mensagem enviada com sucesso'
    }
    
      #swagger.responses[401] = {
          schema: { mensagem: 'Não Autorizado' },
          description: 'Rota não autorizou o acesso'
      }
    */
    res.status(200).json({mensagem: "Projeto Final ESA - Grupo: Luca Cariolin e Raphael Vieira Alves"})
});

routes.get("/oi", verificar(['usuario']), (req,res) => {
    res.status(200).json({mensagem: "oi"});
})

routes.get("/oiAdmin", verificar([1]), (req,res) => {
    res.status(200).json({mensagem: "oi"});
})


routes.get('/users', UserController.getAll);
routes.post('/user', UserController.create);
routes.post('/login', AuthController.login);
routes.post('/logout', AuthController.logout);
routes.get('/atores', AtorController.getAll);
routes.post('/ator', AtorController.create);
routes.post('/ator/filme', AtorController.addFilmes);

module.exports = routes;