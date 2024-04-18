import { Response } from 'express';

export const parseResponse = (action: object | boolean | string | null, res: Response, status = 404): any => {
    if(typeof(action) === 'object' || typeof(action) === 'boolean'){
        return res.status(status).json({
            status,
            data: action
        });
    }
    
    return res.status(status).json({
        status,
        message: action
    });
}