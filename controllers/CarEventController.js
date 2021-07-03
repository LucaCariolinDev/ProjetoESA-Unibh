const { Car, CarEvent, User } = require('../models');
const { Op } = require("sequelize");

class CarEventController {
    /* definir métodos */

    async getAll(req,res) {
        try {
            const carEventResult = await CarEvent.findAll({
                include: [{
                    model: Car,
                    include: [{
                        model: User,
                        attributes: ['id', 'name', 'email']
                    }]
                }]
            });
            return res.status(200).json(carEventResult);
        }
        catch(err) {
            return res.status(400).json({error: err.message});
        }
    }

    async getById(req,res) {
        try {
            const carEvent = await CarEvent.findByPk(req.params.id, {
                include: [{
                    model: Car,
                    include: [{
                        model: User,
                        attributes: ['id', 'name', 'email']
                    }]
                }]
            });
            if(carEvent){
                return res.status(200).json(carEvent);
            }
            else{
                return res.status(404).json({mensagem: "Evento Automotivo não encontrado"})
            }
        }
        catch(err) {
            return res.status(400).json({error: err.message});
        }
    }

    async getAllByEventName(req,res) {
        let name = '%' + req.query.name + '%';
        try {
            const carsEvents = await CarEvent.findAll({
                where: {
                    name: {
                        [Op.like]: name
                    }
                },
                include: [{
                    model: Car,
                    include: [{
                        model: User,
                        attributes: ['id', 'name', 'email']
                    }]
                }]
            });

            if (carsEvents)
                return res.status(200).json(carsEvents);
            else
                return res.status(401).json({mensagem: "Não foram encontrados eventos com esse nome"})
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    async addCar(req,res) {
        try {
            let carEvent = await CarEvent.findByPk(req.body.carEventId);
            if (!carEvent) {
                throw new Error("Evento Automotivo não encontrado");
            }
            else { 
                let car = await Car.findByPk(req.body.carId);
                if (!car) {
                    throw new Error("Carro não encontrado");
                }
                else {
                    await carEvent.addCar(car);
                    return res.status(200).json(carEvent);
                }
            }
        }
        catch (err) {
            return res.status(400).json({error: err.message});
        }
    }

    async create(req,res) {
        try {
            let carEvent = {
                    name: req.body.name,
                    location: req.body.location,
                    duration: req.body.duration,
                };
                const carEventResult = await CarEvent.create(carEvent);              
                return res.status(200).json(carEventResult);
            }
        catch(err) {
            return res.status(400).json({error: err.message});
        }
    }

    async update(req,res) {
        try {
            const carEventOld = await CarEvent.findByPk(req.params.id);
            if (carEventOld) {
                let carEvent = {
                    name: req.body.name,
                    location: req.body.location,
                    duration: req.body.duration,
                };
                const carEventResult = await carEventOld.update(carEvent);
                return res.status(200).json(carEventResult);
            }
            else {
                return res.status(401).json({mensagem: "Evento Automotivo não encontrado"});
            }
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    async delete (req,res) {
        try {
            const carEvent = await CarEvent.findByPk(req.params.id);
            if (carEvent) {                
                await carEvent.destroy();
                return res.status(200).json(carEvent);
            }
            else {
                return res.status(404).json({mensagem: "Evento Automotivo não encontrado"});
            }
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    
    

}
module.exports = new CarEventController();