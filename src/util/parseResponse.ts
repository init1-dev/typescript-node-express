import { Response } from 'express';

export const parseResponse = (action: object | string, res: Response, status = 404): any => {
    if(typeof(action) === "object"){
        return res.status(status).json({
            status,
            payload: action
        });
    }
    
    return res.status(status).json({
        status,
        message: action
    });
}