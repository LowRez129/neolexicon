import { VerifyCallback } from "jsonwebtoken";
import { Response } from "express";

var res: Response;
const verify_callback: VerifyCallback<any> = async (err, decoded) => {
    if (err) { 
        console.log(err.message)
        res.status(400).json(err.message);
    }

    //console.log(decoded.uuid);
    return decoded.uuid;
}

export default verify_callback;