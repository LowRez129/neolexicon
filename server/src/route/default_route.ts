import express from 'express';
import { postLogin, getLogout, postSignIn, getSearch, getUser } from '../controller/defaultController';

const default_route = express.Router();
// CREATE
default_route.post('/sign-in', postSignIn);
default_route.post('/login', postLogin);

// READ
default_route.post('/search', getSearch);
default_route.post('/search/user', getUser);
default_route.get('/logout', getLogout);

export default default_route;