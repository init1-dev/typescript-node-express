import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./getSecretKey";

const TEN_YEARS = 31536000;

export const generateAccessToken = (username: string) => {
    return jwt.sign({username}, SECRET_KEY, { expiresIn: TEN_YEARS });
}