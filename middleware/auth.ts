import { Request, Response, NextFunction } from "express";
import { parseResponse } from "../util/parseResponse";
import { verifyAccessToken } from "../services/loginService";
import { KEY_PUBLIC } from "../util/getKey";
export interface RequestWithUser extends Request {
    user?: {
        type: "public" | "authenticated"
    };
}

export const authMiddleware = ( req: RequestWithUser, res: Response, next: NextFunction ) => {
    const authHeader = req.headers["authorization"];
    
    const token = authHeader && authHeader.split(" ")[1];
    const PUBLIC = String(KEY_PUBLIC).split("'")[1];

    if (!token) {
        return parseResponse("Unauthorized", res, 401);
    }

    let verify: boolean;

    if (token === PUBLIC) {
        req.user = { type: "public" };
    } else {
        req.user = { type: "authenticated" };
    }

    verify = verifyAccessToken(token);

    if(verify){
        next();
    }
};