"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const put_route_1 = __importDefault(require("./route/put_route"));
const default_route_1 = __importDefault(require("./route/default_route"));
const post_route_1 = __importDefault(require("./route/post_route"));
const user_route_1 = __importDefault(require("./route/user_route"));
const authenticate_jwt_middleware_1 = require("./middleware/authenticate_jwt_middleware");
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('post', post_route_1.default);
app.use('/', default_route_1.default);
//app.use('*', checkUser);
app.use('/user', authenticate_jwt_middleware_1.requireAuth, user_route_1.default);
// UPDATE
app.use('/put', put_route_1.default);
app.listen(PORT, () => console.log(`${PORT}`));
