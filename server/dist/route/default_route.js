"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const defaultController_1 = require("../controller/defaultController");
const default_route = express_1.default.Router();
default_route.get('/', defaultController_1.getMusic);
default_route.get('/login', defaultController_1.userLogin);
exports.default = default_route;
