const { Car, User } = require('../models');
const { Op } = require("sequelize");

class CarController {
    /* definir métodos */

    async getAll(req,res) {
        // #swagger.tags = ['Car']
        // #swagger.description = 'Uma rota que retorna todos os carros'
        try {
            const cars = await Car.findAll({
                include: [{
                    model: User,
                    attributes: ['id', 'name', 'email']
                }]
            });
            return res.status(200).json(cars);
        }
        catch(err) {
            return res.status(400).json({error: err.message});
        }
    }

    async getById(req,res) {
        // #swagger.tags = ['Car']
        // #swagger.description = 'Uma rota que retorna o carro pelo Id'
        try {
            const car = await Car.findByPk(req.params.id, {
                include: [{
                    model: User,
                    attributes: ['id', 'name', 'email']
                }]
            });
            if(car){
                return res.status(200).json(car);
            }
            else{
                return res.status(404).json({mensagem: "Carro não encontrado"})
            }
        }
        catch(err) {
            return res.status(400).json({error: err.message});
        }
    }

    async create(req,res) {
        // #swagger.tags = ['Car']
        // #swagger.description = 'Uma rota que cria o carro de um usuário. IMPORTANTE!! -> Deve utilar o token obtido no login. E ser usuário(userType == 2) do tipo Proprietário de Veículo'
        try {
            let car = {
                    brand: req.body.brand,
                    model: req.body.model,
                    year: req.body.year,
                    horsePower: req.body.horsePower,
                    UserId: req.user.id
                };
                const carResult = await Car.create(car);              
                return res.status(200).json(carResult);
            }
        catch(err) {
            return res.status(400).json({error: err.message});
        }
    }

    async update(req,res) {
        // #swagger.tags = ['Car']
        // #swagger.description = 'Uma rota que atualiza o carro de um usuário. IMPORTANTE!! -> Deve utilar o token obtido no login. E ser usuário(userType == 2) do tipo Proprietário de Veículo'
        try {
            const carOld = await Car.findOne({
                where: {
                    id: req.params.id,
                    userId: {
                        [Op.eq]: req.user.id
                    }
                }
            });
            if (carOld) {
                let car = {
                    brand: req.body.brand,
                    model: req.body.model,
                    year: req.body.year,
                    horsePower: req.body.horsePower,
                    UserId: req.user.id
                };
                const carResult = await carOld.update(car);
                return res.status(200).json(carResult);
            }
            else {
                return res.status(401).json({mensagem: "Carro não encontrado"});
            }
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    async delete (req,res) {
        // #swagger.tags = ['Car']
        // #swagger.description = 'Uma rota que deleta carro de um usuário. IMPORTANTE!! -> Deve utilar o token obtido no login. E ser usuário(userType == 2) do tipo Proprietário de Veículo'
        try {
            const car = await Car.findOne({
                where: {
                    id: req.params.id,
                    userId: {
                        [Op.eq]: req.user.id
                    }
                }
            });
            if (car) {                
                await car.destroy();
                return res.status(200).json(car);
            }
            else {
                return res.status(404).json({mensagem: "Carro não encontrado"});
            }
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    async getAllByBrand (req,res) {
        // #swagger.tags = ['Car']
        // #swagger.description = 'Uma rota que retorna todos os carros com o nome da marca informado'
        let brand = '%' + req.query.brand + '%';
        try {
            const cars = await Car.findAll({
                where: {
                    brand: {
                        [Op.like]: brand
                    }
                },
                include: [{
                    model: User,
                    attributes: ['id', 'name', 'email']
                }]
            });

            if (cars)
                return res.status(200).json(cars);
            else
                return res.status(401).json({mensagem: "Não foram encontrados carros com essa marca"})
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }
}
module.exports = new CarController();