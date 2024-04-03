import express, { Request, Response } from 'express';
import path from 'path';

export const rootRoutes = express.Router();

rootRoutes.get('/', async(_req: Request, res: Response) => {
    try {   
        res.sendFile(path.join(__dirname, '../index.html'));
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json(error);
    }
})

rootRoutes.get('/results', async(_req: Request, res: Response) => {
    try {   
        res.sendFile(path.join(__dirname, '../results.html'));
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json(error);
    }
})