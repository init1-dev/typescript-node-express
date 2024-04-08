import express, { NextFunction, Request, Response } from 'express';
import { deleteMessage, editMessage, getAllMessages, getMessage, newMessage } from '../services/messagesService';
import { parseResponse } from '../util/parseResponse';
import { AppError } from '../classes/AppError';

export const messagesRoutes = express.Router();

messagesRoutes.get('/', async(_req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await getAllMessages();
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

messagesRoutes.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await getMessage(req.params.id);
        if(!responseData){
            throw new AppError(404, "Not found");
        }
        parseResponse(responseData as object, res, 200);
    } catch (error) {
        next(error);
    }
})

messagesRoutes.post('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await newMessage(req.body);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

messagesRoutes.put('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await editMessage(req.params.id, req.body);
        if(responseData !== null){
            parseResponse(responseData, res, 200);
        }
    } catch (error) {
        next(error);
    }
})

messagesRoutes.delete('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await deleteMessage(req.params.id);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})