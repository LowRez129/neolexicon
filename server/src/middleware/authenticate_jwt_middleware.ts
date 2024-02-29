import jwt, { VerifyCallback } from 'jsonwebtoken';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import dotenv from 'dotenv';
import pool from '../db';
dotenv.config();
const private_key = process.env.PRIVATEKEY || '';

const requireAuth: RequestHandler = (req, res, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (!token) { return res.status(400).json('JWT is nonexistant.') }
    const verify_callback: VerifyCallback = (err, decoded) => {
        if (err) {
            res.status(400).json('JWT cannot be decoded.');
        } else {
            res.status(200).json(true);
        }
    }
    jwt.verify(token, private_key, verify_callback)
}

const checkUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt

    if (!token) { return res.status(400).end('missing jwt') };
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
            next();
        }
    }
    jwt.verify(token, private_key, verify_callback)
}


export {requireAuth, checkUser};