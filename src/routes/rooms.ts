import express, { NextFunction, Request, Response } from 'express';
import { deleteRoom, editRoom, getAllRooms, getRoom, newRoom } from '../services/roomsService';
import { parseResponse } from '../util/parseResponse';
import { AppError } from '../classes/AppError';

export const roomsRoutes = express.Router();

roomsRoutes.get('/', async(_req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await getAllRooms();
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

roomsRoutes.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {  
        const responseData = await getRoom(req.params.id);
        if(!responseData){
            throw new AppError(404, "Not found");
        }
        parseResponse(responseData as object, res, 200);
    } catch (error) {
        next(error);
    }
})

roomsRoutes.post('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await newRoom(req.body);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

roomsRoutes.put('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await editRoom(req.params.id, req.body);
        if(responseData !== null){
            parseResponse(responseData, res, 200);
        }
    } catch (error) {
        next(error);
    }
})

roomsRoutes.delete('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await deleteRoom(req.params.id);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})