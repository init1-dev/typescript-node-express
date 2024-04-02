import express, { NextFunction, Request, Response } from 'express';
import { deleteMessage, editMessage, getAllMessages, getMessage, newMessage } from '../services/messagesService';
import { authMiddleware } from '../middleware/auth';

export const messagesController = express.Router();

messagesController.get('/', async(_req: Request, res: Response, _next: NextFunction) => {
    res.json(getAllMessages(res));
})

messagesController.get('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    res.json(getMessage(Number(req.params.id), res));
})

messagesController.post('/', authMiddleware, async(req: Request, res: Response, _next: NextFunction) => {
    res.json(newMessage(req.body, res));
})

messagesController.put('/:id', authMiddleware, async(req: Request, res: Response, _next: NextFunction) => {
    res.json(editMessage(Number(req.params.id), req.body, res));
})

messagesController.delete('/:id', authMiddleware, async(req: Request, res: Response, _next: NextFunction) => {
    res.json(deleteMessage(Number(req.params.id), res));
})