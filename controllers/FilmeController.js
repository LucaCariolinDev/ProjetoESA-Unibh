const { Filme } = require('../models');

class FilmeController {
    /* definir métodos */

    async getAll(req,res) {
        try {
            const FilmesResultado = await Filme.findAll({              
            });
            return res.status(200).json(FilmesResultado);
        }
        catch(err) {
            return res.status(400).json({error: err.message});
        }
    }

    async create(req,res) {
        try {
            let filme = {
                    titulo: req.body.titulo,
                 //   LivroId: livro['dataValues']['id']
                };    
                const FilmeResultado = await Filme.create(filme);                
                return res.status(200).json(FilmeResultado);
            }
        catch(err) {
            return res.status(400).json({error: err.message});
        }
    }
}
module.exports = new FilmeController();