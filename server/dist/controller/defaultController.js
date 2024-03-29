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
exports.getLogout = exports.getUserPost = exports.getUser = exports.getSearch = exports.postLogin = exports.postSignIn = void 0;
const db_1 = __importDefault(require("../db"));
const handle_errors_1 = __importDefault(require("../function/handle_errors"));
const create_token_1 = __importDefault(require("../function/create_token"));
// CREATE
const postSignIn = (req, res) => {
    const data = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, email, password } = req.body;
            const user = yield db_1.default.query(`
                    INSERT INTO account (username, email, password) 
                    VALUES ($1, $2, sha256($3))
                    RETURNING *;
                `, [username, email, password]);
            const uuid = user.rows[0].uuid;
            res.status(200).json({ user: uuid });
        }
        catch (err) {
            if (err.message == 'duplicate key value violates unique constraint "unique_username"') {
                res.status(400).json('Username must be unique.');
            }
            if (err.message == 'duplicate key value violates unique constraint "unique_email"') {
                res.status(400).json('Email must be unique.');
            }
        }
    });
    data();
};
exports.postSignIn = postSignIn;
const postLogin = (req, res) => {
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
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: (maxAge * 1000),
                sameSite: "none",
                secure: true
            });
            res.json({ token });
        }
        catch (err) {
            const errors = (0, handle_errors_1.default)(err);
            res.status(400).json(errors);
        }
    });
    login();
};
exports.postLogin = postLogin;
// READ
const getSearch = (req, res) => {
    const get = () => __awaiter(void 0, void 0, void 0, function* () {
        const { word_input } = req.body;
        try {
            const input = (word_input == '') ? (word_input + '%') : ('$' + word_input + '%');
            const data = yield db_1.default.query(`
                    SELECT w.uuid, word, description, user_uuid, a.username
                    FROM words AS w INNER JOIN account AS a ON user_uuid = a.uuid
                    WHERE word LIKE $1 ESCAPE '$'
                    ORDER BY random();
                `, [input]);
            //`SELECT *, a.username FROM music INNER JOIN account AS a ON user_uuid = a.uuid WHERE user_uuid = $1;`
            const words = data.rows;
            res.status(200).json(words);
        }
        catch (err) {
            res.status(400).json(err.message);
        }
    });
    get();
};
exports.getSearch = getSearch;
const getUser = (req, res) => {
    const get = () => __awaiter(void 0, void 0, void 0, function* () {
        const user_uuid = req.body.user_uuid;
        try {
            const data = yield db_1.default.query(`SELECT username FROM account WHERE uuid = $1`, [user_uuid]);
            const username = data.rows[0].username;
            res.status(200).json(username);
        }
        catch (err) {
            res.status(400).json(err.message);
        }
    });
    get();
};
exports.getUser = getUser;
const getUserPost = (req, res) => {
    const get = () => __awaiter(void 0, void 0, void 0, function* () {
        const { word_input, user_uuid } = req.body;
        try {
            const input = (word_input == '') ? (word_input + '%') : ('$' + word_input + '%');
            const data = yield db_1.default.query(`
                    SELECT uuid, word, description 
                    FROM words 
                    WHERE word LIKE $1 ESCAPE '$' AND user_uuid = $2;
                `, [input, user_uuid]);
            const words = data.rows;
            res.status(200).json(words);
        }
        catch (err) {
            res.status(400).json(err.message);
        }
    });
    get();
};
exports.getUserPost = getUserPost;
const getLogout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.end('logged out');
};
exports.getLogout = getLogout;
