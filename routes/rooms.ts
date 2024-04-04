import express, { NextFunction, Request, Response } from 'express';
import { deleteRoom, editRoom, getAllRooms, getRoom, newRoom } from '../services/roomsService';
import { parseResponse } from '../util/parseResponse';

export const roomsRoutes = express.Router();

roomsRoutes.get('/', async(_req: Request, res: Response, _next: NextFunction) => {
    try {
        const responseData = getAllRooms();
        if(responseData.length === 0) {
            parseResponse('Rooms not found', res);
        }
        parseResponse(responseData, res, 200);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})

roomsRoutes.get('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    try {  
        const responseData = getRoom(Number(req.params.id));
        if(responseData === undefined) {
            parseResponse('Room not found', res);
        }
        parseResponse(responseData as object, res, 200);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})

roomsRoutes.post('/', async(req: Request, res: Response, _next: NextFunction) => {
    try {
        const responseData = newRoom(req.body);
        parseResponse(responseData.message, res, responseData.status);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})

roomsRoutes.put('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    try {
        const responseData = editRoom(Number(req.params.id), req.body);
        parseResponse(responseData.message, res, responseData.status);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})

roomsRoutes.delete('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    try {
        const responseData = deleteRoom(Number(req.params.id));
        parseResponse(responseData.message, res, responseData.status);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})