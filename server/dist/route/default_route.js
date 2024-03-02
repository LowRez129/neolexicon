"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const defaultController_1 = require("../controller/defaultController");
const default_route = express_1.default.Router();
// CREATE
default_route.post('/sign-in', defaultController_1.postSignIn);
default_route.post('/login', defaultController_1.postLogin);
default_route.post('/search', defaultController_1.getSearch);
// READ
default_route.get('/', defaultController_1.getMusic);
default_route.get('/logout', defaultController_1.getLogout);
exports.default = default_route;
