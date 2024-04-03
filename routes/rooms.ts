import express, { NextFunction, Response } from 'express';
import { deleteRoom, editRoom, getAllRooms, getRoom, newRoom } from '../services/roomsService';
import { RequestWithUser } from '../middleware/auth';
import { deployAction } from '../util/deployAction';

export const roomsRoutes = express.Router();

roomsRoutes.get('/', async(_req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => getAllRooms(res), res);
})

roomsRoutes.get('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => getRoom(Number(req.params.id), res), res);
})

roomsRoutes.post('/', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => newRoom(req.body, res), res, true, req);
})

roomsRoutes.put('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => editRoom(Number(req.params.id), req.body, res), res, true, req);
})

roomsRoutes.delete('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => deleteRoom(Number(req.params.id), res), res, true, req);
})