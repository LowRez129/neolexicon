import express from 'express';
import { checkUser, requireAuth } from '../middleware/authenticate_jwt_middleware';
import { deleteWord, getUser, postWord, putWord } from '../controller/userController';

const user_route = express.Router();

user_route.get('/require-auth', requireAuth);
user_route.use('*', checkUser);
user_route.post('/post', postWord);
user_route.get('/', getUser);
user_route.put('/put', putWord);
user_route.delete('/delete', deleteWord);


export default user_route;