import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import put_router from './route/put_route';
import sign_in_route from './route/sign_in_route';
import default_route from './route/default_route';
import post_route from './route/post_route';
import user_route from './route/user_route';
import cookieParser from 'cookie-parser';
import { checkUser, requireAuth } from './middleware/authenticate_jwt_middleware';
import logout_route from './route/logout_route';

dotenv.config()
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// CREATE
app.use('/sign-in', sign_in_route);
app.use('post', post_route)

// READ
app.use('/', default_route);
app.use('/logout', logout_route);
//app.use('*', checkUser);
app.use('/user', requireAuth, user_route);

// UPDATE
app.use('/put', put_router);

// DELETE
app.listen(PORT, () => console.log(`${PORT}`));

