import express from 'express';
import { getMusic, getLogin, getLogout, postSignIn } from '../controller/defaultController';

const default_route = express.Router();
// CREATE
default_route.post('/sign-in', postSignIn);

// READ
default_route.get('/', getMusic);
default_route.get('/login', getLogin);
default_route.get('/logout', getLogout);

export default default_route;