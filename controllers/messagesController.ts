import express, { NextFunction, Response } from 'express';
import { deleteMessage, editMessage, getAllMessages, getMessage, newMessage } from '../services/messagesService';
import { RequestWithUser } from '../middleware/auth';
import { deployAction } from '../util/deployAction';

export const messagesController = express.Router();

messagesController.get('/', async(_req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => getAllMessages(res), res);
})

messagesController.get('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => getMessage(Number(req.params.id), res), res);
})

messagesController.post('/', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => newMessage(req.body, res), res, true, req);
})

messagesController.put('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => editMessage(Number(req.params.id), req.body, res), res, true, req);
})

messagesController.delete('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => deleteMessage(Number(req.params.id), res), res, true, req);
})