import express from 'express';
import { checkUser } from '../middleware/authenticate_jwt_middleware';
import { postMusic, putMusic } from '../controller/userController';

const user_route = express.Router();

user_route.get('/:username', (req, res) => {
    const cookie = req.cookies;
    res.json(cookie);
})

user_route.use('*', checkUser);
user_route.post('/:username/post', postMusic);
user_route.put('/:username/put', putMusic)

export default user_route;