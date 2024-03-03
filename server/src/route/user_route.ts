import express from 'express';
import { checkUser, requireAuth } from '../middleware/authenticate_jwt_middleware';
import { deleteWord, getSearch, postWord, putWord } from '../controller/userController';

const user_route = express.Router();
user_route.get('/require-auth', requireAuth);
user_route.use('*', checkUser);
// CREATE
user_route.post('/post', postWord);

// READ
user_route.post('/search', getSearch);

// UPDATE
user_route.put('/put', putWord);

// DELETE
user_route.delete('/delete', deleteWord);


export default user_route;