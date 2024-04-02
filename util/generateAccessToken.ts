import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./getSecretKey";

const ANIO_IN_MS = 365.25 * 24 * 60 * 60 * 1000;
const TEN_YEARS = ANIO_IN_MS * 10;

export const generateAccessToken = (username: string) => {
    return jwt.sign({username}, SECRET_KEY, { expiresIn: ANIO_IN_MS });
}

export const generatePublicToken = (username = null) => {
    return jwt.sign({username}, null, { expiresIn: TEN_YEARS, algorithm: "none" });
}