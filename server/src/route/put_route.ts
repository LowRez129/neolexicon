import express, {Request} from 'express';
import pool from '../db';
import { Music } from '../interface/music_interface';

const put_router = express.Router()

put_router.put('/', (req: Request<{}, {}, Music>, res) => {
    const put = async () => {
        try {
            const {song_url} = req.body;
            const putMusic = `UPDATE music SET song_url = $1 WHERE id = $2;`;
            const data = await pool.query(putMusic, [song_url, 2])
            res.end()
        } catch (err: any) {
            console.log(err.message);
        }
    }

    put();
});

export default put_router;