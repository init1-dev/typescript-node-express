import express, { Request, Response } from 'express';
import path from 'path';

export const rootRoutes = express.Router();

rootRoutes.get('/', async(_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../index.html'));
})

rootRoutes.get('/results', async(_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../results.html'));
})