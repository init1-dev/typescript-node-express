import express, { NextFunction, Request, Response } from 'express';
import { getAll, getOne, newItem, editItem, deleteItem, isRoomExist } from '../services/roomsService';
import { parseResponse } from '../util/parseResponse';
import { validateRoom } from '../util/validations/joiValidationMiddlewares';

export const roomsRoutes = express.Router();

roomsRoutes.get('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { filter } = req.query;
        const responseData =  filter === 'available' ? await getAll(true) : await getAll();
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

roomsRoutes.get('/getRoom/:room', async(req: Request, res: Response, next: NextFunction) => {
    try {  
        const responseData = await isRoomExist(req.params.room);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

roomsRoutes.post('/', validateRoom, async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await newItem(req.body);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

roomsRoutes.put('/:id', validateRoom, async(req: Request, res: Response, next: NextFunction) => {
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