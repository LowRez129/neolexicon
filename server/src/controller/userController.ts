import { RequestHandler, Request } from "express";
import pool from "../db";
import jwt, { VerifyCallback } from "jsonwebtoken";
import Words from "../interface/word_interface";
const private_key = process.env.PRIVATEKEY || '';

// CREATE
const postWord: RequestHandler = (req: Request<{}, {}, Words>, res) => {
    const token = req.cookies.jwt;
    const verify_callback: VerifyCallback<any> = async (err, decoded) => {
        if (err) {
            res.status(400).json(err.message);
        }
        const post = async (user_uuid: string) => {
            try {
                const { word, description } = req.body;
                const postWord = `
                    INSERT INTO words (word, description, user_uuid)
                    VALUES ($1, $2, $3);
                `;
                await pool.query(
                    postWord, 
                    [ word, description, user_uuid]
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
                    `SELECT *, a.username FROM words INNER JOIN account AS a ON user_uuid = a.uuid WHERE user_uuid = $1;`,
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

// DELETE



export { postWord, getUser };