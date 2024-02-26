import express from 'express';
import { checkUser } from '../middleware/authenticate_jwt_middleware';
import { getUser, postMusic, putMusic } from '../controller/userController';

const user_route = express.Router();

user_route.use('*', checkUser);
user_route.get('/', getUser)
user_route.post('/post', postMusic);
user_route.put('/put', putMusic)

export default user_route;