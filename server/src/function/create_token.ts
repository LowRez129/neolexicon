import jwt from 'jsonwebtoken'

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

export default createToken;