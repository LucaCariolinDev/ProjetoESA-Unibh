const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_arquivo.json'
const routes = ['./index.js'];
const docs = {
    "swagger": "2.0",
    "info": {
      "version": "1.0.0",
      "title": "API de Encontro Automotivo - Projeto ESA Unibh",
      "description": "Grupo: Luca Cariolin e Raphael Vieira Alves"
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
    "definitions": {
        User: {
            name: "Raphael",
            email: "Raphael@hotmail.com",
            userType: 1,
            password: "teste7878"
        },
        Car: {
            brand: "Fiat",
            model: "Argo",
            year: 2018,
            horsePower: 100
        },
        CarEvent: {
            name: "Encontro da Frota do Raphael",
            location: "Postinho do Racha(Shell)",
            duration: 3
        }
    }
};

swaggerAutogen(outputFile, routes, docs).then(() => {
    require('./index.js')
})