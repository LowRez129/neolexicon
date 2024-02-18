"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logout_route = express_1.default.Router();
logout_route.get('/', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.end('logged out');
});
exports.default = logout_route;
