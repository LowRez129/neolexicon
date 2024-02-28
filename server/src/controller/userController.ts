import { RequestHandler, Request } from "express";
import pool from "../db";
import { Music } from "../interface/music_interface";
import jwt, { Jwt, JwtPayload, VerifyCallback } from "jsonwebtoken";
const private_key = process.env.PRIVATEKEY || '';

// CREATE
const postMusic: RequestHandler = (req: Request<{}, {}, Music>, res) => {
    const token = req.cookies.jwt;
    const verify_callback: VerifyCallback<any> = async (err, decoded) => {
        if (err) {
            res.status(400).json(err.message);
        }
        const post = async (user_uuid: string) => {
            try {
                const {
                    name, album, artist, album_cover_url, 
                    song_url, date, genre
                } : Music = req.body;
                const postMusic = `
                    with value as (
                        INSERT INTO music (name, album, artist, album_cover_url, song_url, date, genre, user_uuid)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                        RETURNING uuid
                    )
                    UPDATE account SET post_array = array_append(post_array, (SELECT uuid FROM value)) WHERE uuid = $8;
                `;
                const data = await pool.query(
                    postMusic, 
                    [name, album, artist, album_cover_url, song_url, date, genre, user_uuid]
                );

                res.status(200).json("Success");
            } catch (err: any) {
                res.status(400).json(err.message)
            }
        }
        post(decoded!.uuid);
    }
    jwt.verify(token, private_key, verify_callback);
}

// READ
const getUser: RequestHandler = (req, res) => {
    const token = req.cookies.jwt;
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
            const putMusic = `UPDATE music SET song_url = $1 WHERE uuid = $2;`;
            const data = await pool.query(putMusic, [song_url, 2])
            res.end()
        } catch (err: any) {
            console.log(err.message);
        }
    }
    put();
}

// DELETE



export { postMusic, getUser, putMusic };