"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route = express_1.default.Router();
user_route.get('/', (req, res) => {
    const cookie = req.cookies;
    res.json(cookie);
});
user_route.get('/:username', (req, res) => {
    const cookie = req.cookies;
    res.json(cookie);
});
exports.default = user_route;
