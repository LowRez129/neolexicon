import express, { Request } from 'express';
import pool from '../db';
import User from './interface/user_interface';
import { QueryResult } from 'pg';
import jwt from 'jsonwebtoken';
import handleErrors from '../controller/handle_errors';
import dotenv from 'dotenv';

dotenv.config()

const login_route = express.Router();
login_route.get('/', (req: Request<{}, {}, User>, res) => {
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

            //res.setHeader('Set-Header', `is_logged_in=${status}`);const maxAge: number = 3 * 24 * 60 * 60;
            const maxAge: number = 3 * 24 * 60 * 60;
            const createToken = (uuid: string) => {

                let private_key = process.env.PRIVATEKEY;
                if (typeof(private_key) !== 'string') { 
                    console.log('missing privatekey');
                    throw Error('missing privatekey');
                };

                return jwt.sign({uuid}, private_key, {
                    expiresIn:  maxAge,
                });
            };
            const token = createToken(user_object.uuid);
            
            res.cookie('jwt', token, {httpOnly: true, maxAge: (maxAge * 1000) });
            res.status(200).json(user_object);
        } catch (err: any) {
            const errors = handleErrors(err);
            console.log(errors.email, errors.password);
            res.status(400).json(errors);
        }
    }

    login();
});

export default login_route;