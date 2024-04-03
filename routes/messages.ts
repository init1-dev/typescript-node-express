import express, { NextFunction, Response } from 'express';
import { deleteMessage, editMessage, getAllMessages, getMessage, newMessage } from '../services/messagesService';
import { RequestWithUser } from '../middleware/auth';
import { deployAction } from '../util/deployAction';

export const messagesRoutes = express.Router();

messagesRoutes.get('/', async(_req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => getAllMessages(res), res);
})

messagesRoutes.get('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => getMessage(Number(req.params.id), res), res);
})

messagesRoutes.post('/', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => newMessage(req.body, res), res, true, req);
})

messagesRoutes.put('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => editMessage(Number(req.params.id), req.body, res), res, true, req);
})

messagesRoutes.delete('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => deleteMessage(Number(req.params.id), res), res, true, req);
})