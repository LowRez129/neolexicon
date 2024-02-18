"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const sign_in_route = express_1.default.Router();
sign_in_route.post('/', (req, res) => {
    const data = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, email, password } = req.body;
            const user = yield db_1.default.query(`
                    INSERT INTO account (username, email, password) 
                    VALUES ($1, $2, sha256($3))
                    RETURNING *;
                `, [username, email, password]);
            const uuid = user.rows[0].uuid;
            res.status(201).json({ user: uuid });
        }
        catch (err) {
            res.end(err.message);
        }
    });
    data();
});
exports.default = sign_in_route;
