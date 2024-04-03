import express, { NextFunction, Response } from 'express';
import { deleteRoom, editRoom, getAllRooms, getRoom, newRoom } from '../services/roomsService';
import { RequestWithUser } from '../middleware/auth';
import { deployAction } from '../util/deployAction';

export const roomsRoutes = express.Router();

roomsRoutes.get('/', async(_req: RequestWithUser, res: Response, _next: NextFunction) => {
    try {   
        deployAction(() => getAllRooms(res), res);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json(error);
    }
})

roomsRoutes.get('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    try {   
        deployAction(() => getRoom(Number(req.params.id), res), res);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json(error);
    }
})

roomsRoutes.post('/', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    try {   
        deployAction(() => newRoom(req.body, res), res, true, req);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json(error);
    }
})

roomsRoutes.put('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    try {   
        deployAction(() => editRoom(Number(req.params.id), req.body, res), res, true, req);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json(error);
    }
})

roomsRoutes.delete('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    try {   
        deployAction(() => deleteRoom(Number(req.params.id), res), res, true, req);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json(error);
    }
})