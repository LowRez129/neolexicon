import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import default_route from './route/default_route';
import user_route from './route/user_route';

dotenv.config()
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/', default_route);
app.use('/user', user_route);

app.listen(PORT, () => console.log(`${PORT}`));

