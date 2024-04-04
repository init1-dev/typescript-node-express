import express, { NextFunction, Response } from 'express';
import { deleteMessage, editMessage, getAllMessages, getMessage, newMessage } from '../services/messagesService';
import { RequestWithUser } from '../middleware/auth';
import { deployAction } from '../util/deployAction';

export const messagesRoutes = express.Router();

messagesRoutes.get('/', async(_req: RequestWithUser, res: Response, _next: NextFunction) => {
    try {   
        deployAction(() => getAllMessages(res), res);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})

messagesRoutes.get('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    try {   
        deployAction(() => getMessage(Number(req.params.id), res), res);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})

messagesRoutes.post('/', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    try {   
        deployAction(() => newMessage(req.body, res), res, true, req);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})

messagesRoutes.put('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    try {   
        deployAction(() => editMessage(Number(req.params.id), req.body, res), res, true, req);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})

messagesRoutes.delete('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    try {   
        deployAction(() => deleteMessage(Number(req.params.id), res), res, true, req);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})