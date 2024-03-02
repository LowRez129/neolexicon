import express from 'express';
import { getMusic, postLogin, getLogout, postSignIn, getSearch } from '../controller/defaultController';

const default_route = express.Router();
// CREATE
default_route.post('/sign-in', postSignIn);
default_route.post('/login', postLogin);
default_route.post('/search', getSearch);

// READ
default_route.get('/', getMusic);
default_route.get('/logout', getLogout);

export default default_route;