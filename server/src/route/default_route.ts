import express, {Response} from 'express';
import { getMusic, userLogin, } from '../controller/defaultController';

const default_route = express.Router()
default_route.get('/', getMusic);
default_route.get('/login', userLogin);

export default default_route;