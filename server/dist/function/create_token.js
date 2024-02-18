"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
exports.default = createToken;
