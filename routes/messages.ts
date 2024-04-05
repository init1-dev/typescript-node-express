import express, { NextFunction, Request, Response } from 'express';
import { deleteMessage, editMessage, getAllMessages, getMessage, newMessage } from '../services/messagesService';
import { parseResponse } from '../util/parseResponse';

export const messagesRoutes = express.Router();

messagesRoutes.get('/', async(_req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = getAllMessages();
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

messagesRoutes.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = getMessage(Number(req.params.id));
        parseResponse(responseData as object, res, 200);
    } catch (error) {
        next(error);
    }
})

messagesRoutes.post('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = newMessage(req.body);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

messagesRoutes.put('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = editMessage(Number(req.params.id), req.body);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

messagesRoutes.delete('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = deleteMessage(Number(req.params.id));
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})