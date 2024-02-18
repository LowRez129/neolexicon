import express, {Response} from 'express';
import pool from '../db';
import { Music } from './interface/music_interface';

const get_route = express.Router()
const getMusic = `SELECT * FROM music;`;
get_route.get('/', (req, res: Response<Music>) => {
    const get = async () => {
        try {
            const data = await pool.query(getMusic);
            res.end(JSON.stringify(data.rows));

        } catch (err: any) {
            console.log(err.message);
            res.end();
        }
    }

    get();
});

export default get_route;