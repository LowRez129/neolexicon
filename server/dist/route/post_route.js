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
const post_route = express_1.default.Router();
post_route.post('/post', (req, res) => {
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
});
exports.default = post_route;
