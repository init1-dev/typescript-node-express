import { RequestWithUser } from "../middleware/auth";
import { Response } from 'express';
import { isUserAuth } from "./isUserAuth";
import { parseResponse } from "./parseResponse";

export const deployAction = (action: any, res: Response, auth?: boolean, req?: RequestWithUser) => {
    if(auth){
        const isUserAuthenticated: boolean = req ? isUserAuth(req) : false;

        if(isUserAuthenticated) {
            return action();
        }

        parseResponse("Forbidden", res, 403);

    } else {
        action();
    }
}