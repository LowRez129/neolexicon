"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_jwt_middleware_1 = require("../middleware/authenticate_jwt_middleware");
const userController_1 = require("../controller/userController");
const user_route = express_1.default.Router();
user_route.get('/require-auth', authenticate_jwt_middleware_1.requireAuth);
user_route.use('*', authenticate_jwt_middleware_1.checkUser);
user_route.get('/', userController_1.getUser);
user_route.post('/post', userController_1.postWord);
exports.default = user_route;
