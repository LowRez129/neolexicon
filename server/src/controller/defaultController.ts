import { RequestHandler, Request,Response } from "express";
import pool from "../db";
import { QueryResult } from "pg";
import User from "../interface/user_interface";
import handleErrors from "../function/handle_errors";
import createToken from "../function/create_token";
import Words from "../interface/word_interface";

// CREATE
const postSignIn: RequestHandler = (req: Request<{}, {}, User>, res) => {
    const data = async () => {
        try {
            const {username, email, password} = req.body;
            const user: QueryResult<{uuid: string}> = await pool.query(
                `
                    INSERT INTO account (username, email, password) 
                    VALUES ($1, $2, sha256($3))
                    RETURNING *;
                `,
                [ username, email, password ]
            )
            const uuid = user.rows[0].uuid;
            res.status(201).json({user: uuid});
        } catch (err: any) {
            res.end(err.message)
        }
    }
    data();
}

const postLogin: RequestHandler = (req, res) => {
    const login = async () => {
        try {
            const { email, password } = req.body;
            type Rows = {status: boolean, username: string, uuid: string, email: string};
            const user: QueryResult<Rows> = await pool.query(
                `
                    SELECT uuid, email, (password = CAST(sha256($1) AS VARCHAR)) AS status 
                    FROM account WHERE email = $2;
                `,
                [ password, email ]
            );
            
            const user_object = user.rows[0];
            
            if (!user_object) {throw Error('wrong email')};
            if (user_object.status != true) { throw Error('wrong password') };
            
            const token = createToken(user_object.uuid);
            const maxAge: number = 3 * 24 * 60 * 60;

            res.cookie('jwt', token, {
                httpOnly: true, 
                maxAge: (maxAge * 1000), 
                sameSite: "none", 
                secure: true 
            });
            res.json({token});
        } catch (err: any) {
            const errors = handleErrors(err);
            res.status(400).json(errors);
        }
    }
    login();
}

// READ
const getMusic: RequestHandler = (req, res) => {
    const get = async () => {
        try {
            const data: QueryResult<Words> = await pool.query(`SELECT * FROM words;`);
            res.status(200).send(data.rows);

        } catch (err: any) {
            console.log(err.message);
            res.end();
        }
    }
    get();
}

const getSearch: RequestHandler = (req: Request<{}, {}, {word_input: string}>, res) => {
    const get = async () => {
        const { word_input } = req.body;
        try {
            const data = await pool.query(
                `SELECT uuid, word, description FROM words WHERE word LIKE $1`,
                [(word_input + '%')]
            )
            const words = data.rows;
            res.status(200).json(words);
        } catch (err: any) {
            res.status(400).json(err.message)
        }
    }
    get();
}

const getLogout: RequestHandler = (req, res)=> {
    res.cookie('jwt', '', {maxAge: 1});
    res.end('logged out');
};

export { postSignIn, postLogin, getMusic, getSearch, getLogout };