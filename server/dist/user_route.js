"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route = express_1.default.Router();
user_route.get('/:user', (req, res) => {
    const { user } = req.params;
    const cookie = req.cookies;
    console.log(user, cookie);
    res.json(cookie);
});
user_route.get('/set-cookies', (req, res) => {
    res.cookie('is_logged_in', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.redirect('/user/test');
});
user_route.get('/:user/test', (req, res) => {
    const { is_logged_in } = req.cookies;
    if (is_logged_in == true) {
        console.log(is_logged_in);
    }
    ;
    res.end();
});
exports.default = user_route;
