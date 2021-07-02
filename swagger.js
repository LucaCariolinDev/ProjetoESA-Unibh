const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_arquivo.json'
const routes = ['./index.js'];
const docs = {
    "swagger": "2.0",
    "info": {
      "version": "1.0.0",
      "title": "API de Exemplo de Documentação",
      "description": "Esta é uma api documentada"
    },
    "host": "localhost:3000",
    "basePath": "/",
    "tags": [],
    "schemes": [
      "http",
      "https"
    ],
    "consumes": ["application/json"],
    "produces": ["application/json"],
    "securityDefinitions": {
        "apiKeyAuth": {
          
        }
    },
    "definitions": {
        Time: {
            nome: "Cruzeirão Cabuloso",
            sede: "Toca 3"
        },
        Pessoa: {
            nome: "John Snow",
            serie: "GoT",
            time: {
                $ref: '#/definitions/Time'
            },
        }
    }
};

swaggerAutogen(outputFile, routes, docs).then(() => {
    require('./index.js')
})