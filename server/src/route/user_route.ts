import express from 'express';
import { checkUser } from '../middleware/authenticate_jwt_middleware';
import { getUser, postWord } from '../controller/userController';

const user_route = express.Router();

user_route.use('*', checkUser);
user_route.get('/', getUser)
user_route.post('/post', postWord);

export default user_route;