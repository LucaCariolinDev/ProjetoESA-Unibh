const {processo, delay} = require('../process');


class ParallelProcessController {

    async parallelprocess(req, res) {
        // #swagger.tags = ['Execução em Paralelo']
        // #swagger.description = 'Executa operação matemática em paralelo. Processo Pai envia (i+1) * 1000. Processo filho recebe (i+1) * 1000 e soma + 1.'
        
        var numchild = require('os').cpus().length;

        var response = await processo(numchild)

        await delay(10000)

        res.status(200).json(response)
    }
    
}
module.exports = new ParallelProcessController();