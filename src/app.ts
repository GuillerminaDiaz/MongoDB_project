import express from 'express';
import bodyParser from "body-parser";
import cockieParser from "cookie-parser";
import cors from 'cors';
import compression from 'compression';
import router from './routes/index';
import morgan from 'morgan';
//para la compresión de gzip en la aplicación Express.

const server = express();

server.use(cors({
    credentials: true
}));
server.use(compression());
server.use(cockieParser());
server.use(bodyParser.json())
server.use(morgan('dev'));
server.use('/', router)

export default server;