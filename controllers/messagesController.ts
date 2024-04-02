import express, { Request, Response } from 'express';

export const messagesController = express.Router();

messagesController.get('/', async(_req: Request, res: Response) => {
    res.json({
        path: "messages"
    });
})