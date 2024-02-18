import { RequestHandler, Request } from "express";
import pool from "../db";
import { Music } from "../interface/music_interface";

const postMusic: RequestHandler = (req: Request<{}, {}, Music>, res) => {
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
}

const putMusic: RequestHandler = (req: Request<{}, {}, Music>, res) => {
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
}

export { postMusic, putMusic };