import { RequestHandler, Request,Response } from "express";
import { Music } from "../interface/music_interface";
import pool from "../db";
import { QueryResult } from "pg";
import User from "../interface/user_interface";
import handleErrors from "../function/handle_errors";
import createToken from "../function/create_token";

const getMusic: RequestHandler = (req, res: Response<Music>) => {
    const get = async () => {
        try {
            const data = await pool.query(`SELECT * FROM music;`);
            res.end(JSON.stringify(data.rows));

        } catch (err: any) {
            console.log(err.message);
            res.end();
        }
    }
    get();
}

const userLogin: RequestHandler = (req: Request<{}, {}, User>, res) => {
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

            res.cookie('jwt', token, {httpOnly: true, maxAge: (maxAge * 1000) });
            res.status(200).json(user_object);
        } catch (err: any) {
            const errors = handleErrors(err);
            console.log(errors.email, errors.password);
            res.status(400).json(errors);
        }
    }
    login();
}

export { getMusic, userLogin };