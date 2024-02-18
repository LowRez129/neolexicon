import express, { Request, Response } from 'express';
import pool from '../db';
import User from '../interface/user_interface';
import { QueryResult } from 'pg';

const sign_in_route = express.Router();
sign_in_route.post('/', (req: Request<{}, {}, User>, res) => {
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
});

export default sign_in_route;