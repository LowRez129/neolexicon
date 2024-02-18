import express from 'express';

const user_route = express.Router();
user_route.get('/', (req, res) => {
    const cookie = req.cookies;
    res.json(cookie);
})

user_route.get('/:username', (req, res) => {
    const cookie = req.cookies;
    res.json(cookie);
})

export default user_route;