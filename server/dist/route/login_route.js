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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handle_errors_1 = __importDefault(require("../controller/handle_errors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const login_route = express_1.default.Router();
login_route.get('/', (req, res) => {
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
            //res.setHeader('Set-Header', `is_logged_in=${status}`);const maxAge: number = 3 * 24 * 60 * 60;
            const maxAge = 3 * 24 * 60 * 60;
            const createToken = (uuid) => {
                let private_key = process.env.PRIVATEKEY;
                if (typeof (private_key) !== 'string') {
                    console.log('missing privatekey');
                    throw Error('missing privatekey');
                }
                ;
                return jsonwebtoken_1.default.sign({ uuid }, private_key, {
                    expiresIn: maxAge,
                });
            };
            const token = createToken(user_object.uuid);
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
});
exports.default = login_route;
