import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { parseResponse } from "../Helpers/parseResponse";

const TEN_YEARS = 31536000;

const dotenv = require("dotenv");
dotenv.config();

interface AuthenticatedRequest extends Request {
    user?: any;
}

const SECRET_KEY: Secret = process.env.TOKEN_SECRET || "";

export const authMiddleware = ( req: AuthenticatedRequest, res: Response, next: NextFunction ) => {
    const authHeader = req.headers["authorization"];
    
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.json(parseResponse("Unauthorized", 401));
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.json(parseResponse("Forbidden", 403));
        }
        req.user = user;
        next();
    });
};

export const generateAccessToken = (username: string) => {
    return jwt.sign({username}, SECRET_KEY, { expiresIn: TEN_YEARS });
}