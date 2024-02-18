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
exports.checkUser = exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("../db"));
dotenv_1.default.config();
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        let private_key = process.env.PRIVATEKEY;
        if (typeof (private_key) !== 'string') {
            console.log('missing privatekey');
            throw Error('missing privatekey');
        }
        ;
        const verify_callback = (err, decoded) => {
            if (err) {
                console.log(err.message);
                res.end();
            }
            else {
                //console.log(decoded);
                next();
            }
        };
        jsonwebtoken_1.default.verify(token, private_key, verify_callback);
    }
    else {
        console.log('missing jwt');
        res.end();
    }
};
exports.requireAuth = requireAuth;
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        let private_key = process.env.PRIVATEKEY;
        if (typeof (private_key) !== 'string') {
            console.log('missing privatekey');
            throw Error('missing privatekey');
        }
        ;
        const verify_callback = (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                res.end();
            }
            else {
                //console.log(decoded);
                let data = yield db_1.default.query(`
                        SELECT username FROM account WHERE uuid = $1;
                    `, [decoded.uuid]);
                const user = data.rows[0];
                res.locals.user = user;
                console.log(res.locals.user, 'huh');
                next();
            }
        });
        jsonwebtoken_1.default.verify(token, private_key, verify_callback);
    }
    else {
        console.log('missing jwt');
        res.end('missing jwt');
    }
};
exports.checkUser = checkUser;
