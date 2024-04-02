import express, { NextFunction, Request, Response } from 'express';
import { deleteMessage, editMessage, getAllMessages, getMessage, newMessage } from '../services/messagesService';

export const messagesController = express.Router();

messagesController.get('/', async(_req: Request, res: Response, _next: NextFunction) => {
    res.json(getAllMessages());
})

messagesController.get('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    res.json(getMessage(Number(req.params.id)));
})

messagesController.post('/', async(req: Request, res: Response, _next: NextFunction) => {
    res.json(newMessage(req.body));
})

messagesController.put('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    res.json(editMessage(Number(req.params.id), req.body));
})

messagesController.delete('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    res.json(deleteMessage(Number(req.params.id)));
})