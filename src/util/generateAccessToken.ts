import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "./getKeys";
import { TEN_YEARS } from "./magicNumbers";

export const generateAccessToken = (username: string) => {
    return jwt.sign({username}, SECRET_TOKEN, { expiresIn: TEN_YEARS });
}