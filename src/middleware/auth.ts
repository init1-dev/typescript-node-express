import { Request, Response, NextFunction } from "express";
import { parseResponse } from "../util/parseResponse";
import { SECRET_TOKEN } from "../util/getKeys";
import jwt from "jsonwebtoken";

export const authMiddleware = ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const authHeader = req.headers["authorization"];
        
        const token = authHeader && authHeader.split(" ")[1];
    
        if (!token) {
            return parseResponse("Unauthorized", res, 401);
        }

        jwt.verify(token, SECRET_TOKEN as string, (err) => {
            if (err) {
                parseResponse("Forbidden", res, 403);
            }
            next();
        });
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
};