import express from 'express';

const logout_route = express.Router();

logout_route.get('/', (req, res)=> {
    res.cookie('jwt', '', {maxAge: 1});
    res.end('logged out');
});

export default logout_route;