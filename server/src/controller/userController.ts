import { RequestHandler, Request } from "express";
import pool from "../db";
import { Music } from "../interface/music_interface";
import jwt, { VerifyCallback } from "jsonwebtoken";

// CREATE
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

// READ
const getUser: RequestHandler = (req, res) => {
    const token = req.cookies.jwt;
    const private_key = process.env.PRIVATEKEY || '';
    const verify_callback: VerifyCallback<any> = async (err, decoded) => {
        if (err) { 
            console.log(err.message)
            res.status(400).json(err.message);
        }
        const get = async () => {
            try {
                const user = await pool.query(
                    `SELECT username, post_array FROM account WHERE uuid = $1`,
                    [decoded.uuid]
                )
                const user_properties = user.rows[0];
                res.status(200).json(user_properties);
    
            } catch (err: any) {
                console.log(err.message);
                res.status(400).json(err.message);
            }
        }
        get();
    }
    jwt.verify(token, private_key, verify_callback);
}

// UPDATE
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

export { postMusic, getUser, putMusic };