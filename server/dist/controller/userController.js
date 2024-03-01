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
exports.putWord = exports.deleteWord = exports.getUser = exports.postWord = void 0;
const db_1 = __importDefault(require("../db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const private_key = process.env.PRIVATEKEY || '';
// CREATE
const postWord = (req, res) => {
    const token = req.cookies.jwt;
    const verify_callback = (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.status(400).json(err.message);
        }
        const post = (user_uuid) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { word, description } = req.body;
                const postWord = `
                    INSERT INTO words (word, description, user_uuid)
                    VALUES ($1, $2, $3);
                `;
                yield db_1.default.query(postWord, [word, description, user_uuid]);
                res.status(200).json("Success");
            }
            catch (err) {
                res.status(400).json(err.message);
            }
        });
        post(decoded.uuid);
    });
    jsonwebtoken_1.default.verify(token, private_key, verify_callback);
};
exports.postWord = postWord;
// READ
const getUser = (req, res) => {
    const token = req.cookies.jwt;
    const verify_callback = (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log(err.message);
            res.status(400).json(err.message);
        }
        const get = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield db_1.default.query(`SELECT * FROM words WHERE user_uuid = $1;`, [decoded.uuid]);
                const user_properties = user.rows;
                res.status(200).json(user_properties);
            }
            catch (err) {
                console.log(err.message);
                res.status(400).json(err.message);
            }
        });
        get();
    });
    jsonwebtoken_1.default.verify(token, private_key, verify_callback);
};
exports.getUser = getUser;
// UPDATE
const putWord = (req, res) => {
    const { uuid, word, description } = req.body;
    const put = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield db_1.default.query(`UPDATE words SET word = $2, description = $3 WHERE uuid = $1;`, [uuid, word, description]);
            res.status(200).json('Put Success');
        }
        catch (err) {
            res.status(400).json(err.message);
        }
    });
    put();
};
exports.putWord = putWord;
// DELETE
const deleteWord = (req, res) => {
    const UUID = req.body.uuid;
    const del = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield db_1.default.query(`DELETE FROM words WHERE uuid = $1;`, [UUID]);
            res.status(200).json('DELETED');
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json(err.message);
        }
    });
    del();
};
exports.deleteWord = deleteWord;
