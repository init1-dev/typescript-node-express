import { Response } from 'express';

export const parseResponse = (message: any, res: Response, status = 404): void => {
    res.status(status).json({
        status,
        message
    });
}