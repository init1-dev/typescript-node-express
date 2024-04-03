import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../util/getSecretKey";

const ANIO_IN_MS = 365.25 * 24 * 60 * 60 * 1000;
const TEN_YEARS = ANIO_IN_MS * 10;

export const login = async(username: string, password: string) => {
    if(username === 'init1.dev' && password === '12345'){
        const token = generateAccessToken(username);
        return {
            user: username,
            token: token
        };
    }
    return null;
}

export const generateAccessToken = (username: string) => {
    return jwt.sign({username}, SECRET_KEY, { expiresIn: ANIO_IN_MS });
}

export const verifyAccessToken = (token: string): boolean => {
    let verify = true;
    jwt.verify(token, SECRET_KEY, (err) => {
        if (err) {
            verify = false;
        }
    });
    return verify;
}

export const generatePublicToken = (username = null) => {
    return jwt.sign({username}, null, { expiresIn: TEN_YEARS, algorithm: "none" });
}