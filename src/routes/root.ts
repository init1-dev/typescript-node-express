import express, { Request, Response } from 'express';
import path from 'path';

export const rootRoutes = express.Router();

rootRoutes.get('/', async(_req: Request, res: Response) => {
    try {   
        res.sendFile(path.resolve(process.cwd(), 'index.html'));
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json(error);
    }
})