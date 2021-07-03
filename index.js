const express = require('express');
const routes = require('./routes/routes')
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_arquivo.json');
var bodyParser = require('body-parser');

require('dotenv').config({ path: './config/.env'});

const app = express();

app.use(express.urlencoded({extended: false}));

app.use(bodyParser.json())

app.use('/documentacao', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes);
app.listen(3000);

