import express, { NextFunction, Request, Response } from 'express';
import { getAll, getOne, newItem, editItem, deleteItem } from '../services/roomsService';
import { parseResponse } from '../util/parseResponse';

export const roomsRoutes = express.Router();

roomsRoutes.get('/', async(_req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await getAll();
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

roomsRoutes.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {  
        const responseData = await getOne(req.params.id);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

roomsRoutes.post('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await newItem(req.body);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

roomsRoutes.put('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await editItem(req.params.id, req.body);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

roomsRoutes.delete('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteItem(req.params.id);
        parseResponse("success", res, 200);
    } catch (error) {
        next(error);
    }
})