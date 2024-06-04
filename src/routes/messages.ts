import express, { NextFunction, Request, Response } from 'express';
import { getAll, getOne, newItem, editItem, deleteItem } from '../services/messagesService';
import { parseResponse } from '../util/parseResponse';
import { validateMessage } from '../util/validations/joiValidationMiddlewares';

export const messagesRoutes = express.Router();

messagesRoutes.get('/', async(_req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await getAll();
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

messagesRoutes.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await getOne(req.params.id);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

messagesRoutes.post('/', validateMessage, async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await newItem(req.body);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

messagesRoutes.put('/:id', validateMessage, async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await editItem(req.params.id, req.body);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

messagesRoutes.delete('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteItem(req.params.id);
        parseResponse("success", res, 200);
    } catch (error) {
        next(error);
    }
})