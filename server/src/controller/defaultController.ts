import { RequestHandler, Request } from "express";
import pool from "../db";
import { QueryResult } from "pg";
import User from "../interface/user_interface";
import handleErrors from "../function/handle_errors";
import createToken from "../function/create_token";

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
            res.status(200).json({user: uuid});
        } catch (err: any) {
            if (err.message == 'duplicate key value violates unique constraint "unique_username"') {
                res.status(400).json('Username must be unique.');
            }
            if (err.message == 'duplicate key value violates unique constraint "unique_email"') {
                res.status(400).json('Email must be unique.');
            }
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
const getSearch: RequestHandler = (req: Request<{}, {}, {word_input: string}>, res) => {
    const get = async () => {
        const { word_input } = req.body;
        try {
            const input = (word_input == '') ? (word_input + '%') : ('$' + word_input + '%');
            const data = await pool.query(
                `
                    SELECT w.uuid, word, description, user_uuid, a.username
                    FROM words AS w INNER JOIN account AS a ON user_uuid = a.uuid
                    WHERE word LIKE $1 ESCAPE '$'
                    ORDER BY random();
                `,
                [input]
            )
            //`SELECT *, a.username FROM music INNER JOIN account AS a ON user_uuid = a.uuid WHERE user_uuid = $1;`
            
            const words = data.rows;
            res.status(200).json(words);
        } catch (err: any) {
            res.status(400).json(err.message)
        }
    }
    get();
}

const getUser: RequestHandler = (req: Request<{}, {}, {user_uuid: string}>, res) => {
    const get = async () => {
        const user_uuid = req.body.user_uuid;
        try {
            const data: QueryResult<{username: string}> = await pool.query(
                `SELECT username FROM account WHERE uuid = $1`,
                [user_uuid]
            )
            const username = data.rows[0].username;
            res.status(200).json(username);
        } catch (err: any) {
            res.status(400).json(err.message);
        }
    }
    get();
}

const getUserPost: RequestHandler = (req: Request<{}, {}, {word_input: string, user_uuid: string}>, res) => {
    const get = async () => {
        const { word_input, user_uuid } = req.body;
        try {
            const input = (word_input == '') ? (word_input + '%') : ('$' + word_input + '%');
            const data = await pool.query(
                `
                    SELECT uuid, word, description 
                    FROM words 
                    WHERE word LIKE $1 ESCAPE '$' AND user_uuid = $2;
                `,
                [input, user_uuid]
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

export { postSignIn, postLogin, getSearch, getUser, getUserPost, getLogout };