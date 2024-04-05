import express, { NextFunction, Request, Response } from 'express';
import { deleteRoom, editRoom, getAllRooms, getRoom, newRoom } from '../services/roomsService';
import { parseResponse } from '../util/parseResponse';

export const roomsRoutes = express.Router();

roomsRoutes.get('/', async(_req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = getAllRooms();
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

roomsRoutes.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {  
        const responseData = getRoom(Number(req.params.id));
        parseResponse(responseData as object, res, 200);
    } catch (error) {
        next(error);
    }
})

roomsRoutes.post('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = newRoom(req.body);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

roomsRoutes.put('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = editRoom(Number(req.params.id), req.body);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

roomsRoutes.delete('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = deleteRoom(Number(req.params.id));
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})