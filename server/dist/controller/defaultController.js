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
exports.userLogin = exports.getMusic = void 0;
const db_1 = __importDefault(require("../db"));
const handle_errors_1 = __importDefault(require("../function/handle_errors"));
const create_token_1 = __importDefault(require("../function/create_token"));
const getMusic = (req, res) => {
    const get = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield db_1.default.query(`SELECT * FROM music;`);
            res.end(JSON.stringify(data.rows));
        }
        catch (err) {
            console.log(err.message);
            res.end();
        }
    });
    get();
};
exports.getMusic = getMusic;
const userLogin = (req, res) => {
    const login = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield db_1.default.query(`
                    SELECT uuid, email, (password = CAST(sha256($1) AS VARCHAR)) AS status 
                    FROM account WHERE email = $2;
                `, [password, email]);
            const user_object = user.rows[0];
            if (!user_object) {
                throw Error('wrong email');
            }
            ;
            if (user_object.status != true) {
                throw Error('wrong password');
            }
            ;
            const token = (0, create_token_1.default)(user_object.uuid);
            const maxAge = 3 * 24 * 60 * 60;
            res.cookie('jwt', token, { httpOnly: true, maxAge: (maxAge * 1000) });
            res.status(200).json(user_object);
        }
        catch (err) {
            const errors = (0, handle_errors_1.default)(err);
            console.log(errors.email, errors.password);
            res.status(400).json(errors);
        }
    });
    login();
};
exports.userLogin = userLogin;
