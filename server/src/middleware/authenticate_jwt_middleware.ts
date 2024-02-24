import jwt, { VerifyCallback } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import pool from '../db';
dotenv.config();

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    console.log(token)

    if (token) {
        let private_key = process.env.PRIVATEKEY;
        if (typeof(private_key) !== 'string') { 
            console.log('missing privatekey');
            throw Error('missing privatekey');
        };

        const verify_callback: VerifyCallback = (err, decoded) => {
            if (err) {
                console.log(err.message);
                res.end();
            } else {
                //console.log(decoded);
                next();
            }
        }

        jwt.verify(token, private_key, verify_callback)
    } else {
        res.status(400).json('missing jwt');
    }
}

const checkUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (token) {
        let private_key = process.env.PRIVATEKEY;
        if (typeof(private_key) !== 'string') { 
            console.log('missing privatekey');
            throw Error('missing privatekey');
        };

        const verify_callback: VerifyCallback<any> = async (err, decoded) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                res.end();
            } else {
                //console.log(decoded);
                let data = await pool.query(
                    `
                        SELECT username FROM account WHERE uuid = $1;
                    `, 
                    [decoded.uuid]
                )
                const user = data.rows[0];
                res.locals.user = user;
                console.log(res.locals.user, 'huh');
                next();
            }
        }

        jwt.verify(token, private_key, verify_callback)
    } else {
        res.status(400).end('missing jwt');
    }
}


export {requireAuth, checkUser};