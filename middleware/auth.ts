import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { parseResponse } from "../util/parseResponse";
import { SECRET_KEY } from "../util/getSecretKey";
interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authMiddleware = ( req: AuthenticatedRequest, res: Response, next: NextFunction ) => {
    const authHeader = req.headers["authorization"];
    
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.json(parseResponse("Unauthorized", res, 401));
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.json(parseResponse("Forbidden", res, 403));
        }
        req.user = user;
        next();
    });
};