import jwt from 'jsonwebtoken'
const secret = process.env.JWT_SECRET;

export const jwtSign = (data) => {
    if (!secret) {
        throw 'Must have secret'
    }
    return jwt.sign(data, secret);
}