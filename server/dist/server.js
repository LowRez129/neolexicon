"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const default_route_1 = __importDefault(require("./route/default_route"));
const user_route_1 = __importDefault(require("./route/user_route"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: CLIENT_URL,
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/', default_route_1.default);
app.use('/user', user_route_1.default);
app.listen(PORT, () => console.log(`${PORT}`));
