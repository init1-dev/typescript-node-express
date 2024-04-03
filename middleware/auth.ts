import { Request, Response, NextFunction } from "express";
import { parseResponse } from "../util/parseResponse";
import { verifyAccessToken } from "../services/loginService";
interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authMiddleware = ( req: AuthenticatedRequest, res: Response, next: NextFunction ) => {
    const authHeader = req.headers["authorization"];
    
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.json(parseResponse("Unauthorized", res, 401));
    }

    const verify: boolean = verifyAccessToken(token);

    if(!verify){
        return {
            message: "Forbidden",
            status: 403 
        }
    }
    next();
};