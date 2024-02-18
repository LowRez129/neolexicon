"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_jwt_middleware_1 = require("../middleware/authenticate_jwt_middleware");
const userController_1 = require("../controller/userController");
const user_route = express_1.default.Router();
user_route.get('/:username', (req, res) => {
    const cookie = req.cookies;
    res.json(cookie);
});
user_route.use('*', authenticate_jwt_middleware_1.checkUser);
user_route.post('/:username/post', userController_1.postMusic);
user_route.put('/:username/put', userController_1.putMusic);
exports.default = user_route;
