import express, { Request, Response } from 'express';
import path from 'path';

export const rootController = express.Router();

rootController.get('/', async(_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../index.html'));
})

rootController.get('/results', async(_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../results.html'));
})