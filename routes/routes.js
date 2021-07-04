const { Router } = require('express');
const UserController = require("../controllers/UserController");
const CarController = require("../controllers/CarController");
const AuthController = require("../controllers/AuthController");
const CarEventController = require("../controllers/CarEventController");
const {verificar, verificarAcessoUsuario} = require('../middlewares/autenticacao');
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


routes.get("/oiAdmin", verificar([1]), (req,res) => {
    res.status(200).json({mensagem: "oi"});
})

// #swagger.tags = ['User']
routes.get('/users', UserController.getAll);
routes.get('/users/getAllByName', UserController.getAllByName);
routes.post('/user', UserController.create);
routes.get('/user/:id', UserController.getById);
routes.put('/user/:id', verificarAcessoUsuario(), UserController.update);
routes.delete('/user/:id', verificarAcessoUsuario(), UserController.delete);

// #swagger.tags = ['Auth']
routes.post('/login', AuthController.login);

// #swagger.tags = ['Car']
routes.get('/cars', CarController.getAll);
routes.get('/cars/getCarsByBrand', CarController.getAllByBrand);
routes.post('/car', verificar([2]), CarController.create);
routes.get('/car/:id', CarController.getById);
routes.put('/car/:id', verificar([2]), CarController.update);
routes.delete('/car/:id', verificar([2]), CarController.delete);

// #swagger.tags = ['CarEvent']
routes.get('/carsevents', CarEventController.getAll);
routes.get('/carevent/:id', CarEventController.getById);
routes.put('/carevent/:id', verificar([1]), CarEventController.update);
routes.delete('/carevent/:id', verificar([1]), CarEventController.delete);
routes.get('/carsevents/getAllByEventName', CarEventController.getAllByEventName);
routes.post('/carevent', verificar([1]), CarEventController.create);
routes.post('/carevent/addCarIntoCarEvent', verificar([1]), CarEventController.addCar);

module.exports = routes;