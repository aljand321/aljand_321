import http from 'http';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './server/routes';
var cors = require('cors')

const Authtoken = require('./server/midleware/token');

const hostname = '127.0.0.1';
const red = '192.168.1.80';
const port = 3000;
const app = express() // setup express application
const server = http.createServer(app);

app.use(logger('dev')); // log requests to the console

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(Authtoken);
routes(app);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the default API route',
}));

server.listen(port, red | hostname, () => {
  console.log(`Server running at http://${red}:${port}/`);
});