import express, { NextFunction, Request, Response } from 'express';
import { deleteMessage, editMessage, getAllMessages, getMessage, newMessage } from '../services/messagesService';
import { parseResponse } from '../util/parseResponse';

export const messagesRoutes = express.Router();

messagesRoutes.get('/', async(_req: Request, res: Response, _next: NextFunction) => {
    try {
        const responseData = getAllMessages();
        if(responseData.length === 0) {
            parseResponse('Messages not found', res);
        }
        parseResponse(responseData, res, 200);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})

messagesRoutes.get('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    try {
        const responseData = getMessage(Number(req.params.id));
        if(responseData === undefined) {
            parseResponse('Message not found', res);
        }
        parseResponse(responseData as object, res, 200);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})

messagesRoutes.post('/', async(req: Request, res: Response, _next: NextFunction) => {
    try {
        const responseData = newMessage(req.body);
        parseResponse(responseData.message, res, responseData.status);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})

messagesRoutes.put('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    try {
        const responseData = editMessage(Number(req.params.id), req.body);
        parseResponse(responseData.message, res, responseData.status);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})

messagesRoutes.delete('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    try {
        const responseData = deleteMessage(Number(req.params.id));
        parseResponse(responseData.message, res, responseData.status);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})