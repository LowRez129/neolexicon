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
const put_router = express_1.default.Router();
put_router.put('/', (req, res) => {
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
});
exports.default = put_router;
