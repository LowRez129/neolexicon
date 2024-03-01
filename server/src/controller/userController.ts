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
                    `SELECT * FROM words WHERE user_uuid = $1;`,
                    [decoded.uuid]
                )
                
                const user_properties = user.rows;
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
const putWord: RequestHandler = (req: Request<{}, {}, {uuid: string, word: string, description: string}>, res) => {
    const { uuid, word, description } = req.body;

    const put = async () => {
        try {
            await pool.query(
                `UPDATE words SET word = $2, description = $3 WHERE uuid = $1;`,
                [uuid, word, description]
            )
            res.status(200).json('Put Success');
        } catch (err: any) {
            res.status(400).json(err.message);
        }
    }
    put();
}

// DELETE
const deleteWord: RequestHandler = (req: Request<{}, {}, {uuid: string}>, res) => {
    const UUID = req.body.uuid;

    const del = async () => {
        try {
            await pool.query(
                `DELETE FROM words WHERE uuid = $1;`,
                [UUID]
            );
            res.status(200).json('DELETED');
        } catch (err: any) {
            console.log(err.message);
            res.status(400).json(err.message);
        }
    }
    del();
}



export { postWord, getUser, deleteWord, putWord };