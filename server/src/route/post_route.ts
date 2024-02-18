import express, {Request} from 'express';
import pool from '../db';
import { Music } from '../interface/music_interface';

const post_route = express.Router();

post_route.post('/post', (req: Request<{}, {}, Music>, res) => {
    const post = async () => {
        try {
            const {
                name, album, artist, album_cover_url, 
                song_url, date, genre
            } : Music = req.body;
            const postMusic = `
                INSERT INTO music (name, album, artist, album_cover_url, song_url, date, genre)
                VALUES ($1, $2, $3, $4, $5, $6, $7);
            `;
            const data = await pool.query(
                postMusic, 
                [name, album, artist, album_cover_url, song_url, date, genre]
            );

            res.end();
        } catch (err: any) {
            console.log(err.message)
        }
    }

    post();
})

export default post_route;