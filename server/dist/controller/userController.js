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
exports.putMusic = exports.getUser = exports.postMusic = void 0;
const db_1 = __importDefault(require("../db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// CREATE
const postMusic = (req, res) => {
    const post = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, album, artist, album_cover_url, song_url, date, genre } = req.body;
            const postMusic = `
                INSERT INTO music (name, album, artist, album_cover_url, song_url, date, genre)
                VALUES ($1, $2, $3, $4, $5, $6, $7);
            `;
            const data = yield db_1.default.query(postMusic, [name, album, artist, album_cover_url, song_url, date, genre]);
            res.end();
        }
        catch (err) {
            console.log(err.message);
        }
    });
    post();
};
exports.postMusic = postMusic;
// READ
const getUser = (req, res) => {
    const token = req.cookies.jwt;
    const private_key = process.env.PRIVATEKEY || '';
    const verify_callback = (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log(err.message);
            res.status(400).json(err.message);
        }
        const get = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield db_1.default.query(`SELECT username, post_array FROM account WHERE uuid = $1`, [decoded.uuid]);
                const user_properties = user.rows[0];
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
const putMusic = (req, res) => {
    const put = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { song_url } = req.body;
            const putMusic = `UPDATE music SET song_url = $1 WHERE id = $2;`;
            const data = yield db_1.default.query(putMusic, [song_url, 2]);
            res.end();
        }
        catch (err) {
            console.log(err.message);
        }
    });
    put();
};
exports.putMusic = putMusic;
