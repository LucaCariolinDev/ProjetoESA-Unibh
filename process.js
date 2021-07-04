async function processo(numchild) {
    var child_process = require('child_process');
    var execucao = {
        'Descricao': 'Executado operação matemática em paralelo. Processo Pai envia (i+1) * 1000. Processo filho recebe (i+1) * 1000 e soma + 1.',
        'QuantidadeCPUs': numchild
    };
    var filhos = [];
    var done = 0;
    for (var i = 0; i < numchild; i++) {
        var child = child_process.fork('./child');
        child.send((i + 1) * 1000);
        child.on('message', function (message) {
            console.log('[parent] received message from child:', message);
            let filho = {
                "ProcessoFilho": message.child,
                "ValorRecebidoPai": message.messageRecevied,
                "ValorRetornado": message.result
            }
            filhos.push(filho)
            done++;
            if (done === numchild) {
                console.log('[parent] received all results');
            }
        });
    }

    execucao["Filhos"] = filhos;

    return execucao;
}

function delay(t, val) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(val);
        }, t);
    });
 }

module.exports = {processo, delay}
