const { Router } = require('express');
const UserController = require("../controllers/UserController");
const CarController = require("../controllers/CarController");
const AuthController = require("../controllers/AuthController");
const CarEventController = require("../controllers/CarEventController");
const ParallelProcessController = require("../controllers/ParallelProcessController");
const {verificar, verificarAcessoUsuario} = require('../middlewares/autenticacao');
const routes = Router();

routes.get('/', (req,res) => {
    // #swagger.tags = ['ROTA PRINCIPAL']
    // #swagger.description = 'Uma rota que retorna informações do grupo'

    /* #swagger.responses[200] = {
        schema: { mensagem: 'Projeto Final ESA - Grupo: Luca Cariolin e Raphael Vieira Alves' },
        description: 'Mensagem enviada com sucesso'
    }
    */
    res.status(200).json({mensagem: "Projeto Final ESA - Grupo: Luca Cariolin e Raphael Vieira Alves"})
});


routes.get('/processamentoparalelo', ParallelProcessController.parallelprocess);


routes.get('/users', UserController.getAll);
routes.get('/users/getAllByName', UserController.getAllByName);
routes.post('/user', UserController.create);
routes.get('/user/:id', UserController.getById);
routes.put('/user/:id', verificarAcessoUsuario(), UserController.update);
routes.delete('/user/:id', verificarAcessoUsuario(), UserController.delete);


routes.post('/login', AuthController.login);


routes.get('/cars', CarController.getAll);
routes.get('/cars/getCarsByBrand', CarController.getAllByBrand);
routes.post('/car', verificar([2]), CarController.create);
routes.get('/car/:id', CarController.getById);
routes.put('/car/:id', verificar([2]), CarController.update);
routes.delete('/car/:id', verificar([2]), CarController.delete);


routes.get('/carsevents', CarEventController.getAll);
routes.get('/carevent/:id', CarEventController.getById);
routes.put('/carevent/:id', verificar([1]), CarEventController.update);
routes.delete('/carevent/:id', verificar([1]), CarEventController.delete);
routes.get('/carsevents/getAllByEventName', CarEventController.getAllByEventName);
routes.post('/carevent', verificar([1]), CarEventController.create);
routes.post('/carevent/addCarIntoCarEvent', verificar([1]), CarEventController.addCar);

module.exports = routes;