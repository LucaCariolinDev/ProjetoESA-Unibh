const { Ator, Filme } = require('../models');

class AtorController {
    /* definir métodos */

    async getAll(req,res) {
        try {
            const AtorsResultado = await Ator.findAll({
                include: [{
                    model: Filme,
                }]
            });
            return res.status(200).json(AtorsResultado);
        }
        catch(err) {
            return res.status(400).json({error: err.message});
        }
    }

    async addFilmes(req,res) {
        try {
            let ator = await Ator.findByPk(req.body.atorid);
            if (!ator) {
                throw new Error("Ator não existe");
            }
            else { 
                let filme = await Filme.findByPk(req.body.filmeid);
                if (!filme) {
                    throw new Error("Filme não existe");
                }
                else {
                    await ator.addFilmes(filme);
                    return res.status(200).json(ator);
                }
            }
        }
        catch (err) {
            return res.status(400).json({error: err.message});
        }
    }
    async create(req,res) {
        try {
            let filme = await Filme.findByPk(req.body.filmeid);
            if (!filme) {
                throw new Error("Filme não existe");
            }
            else {
                let ator = {
                    nome: req.body.nome,
                 //   LivroId: livro['dataValues']['id']
                };    
                const AtorResultado = await Ator.create(ator);
                await AtorResultado.addFilmes(filme);
                return res.status(200).json(AtorResultado);
            }
        } catch(err) {
            return res.status(400).json({error: err.message});
        }
    }
}
module.exports = new AtorController();