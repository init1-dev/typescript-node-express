import express, { NextFunction, Response } from 'express';
import { deleteRoom, editRoom, getAllRooms, getRoom, newRoom } from '../services/roomsService';
import { RequestWithUser } from '../middleware/auth';
import { deployAction } from '../util/deployAction';

export const roomsController = express.Router();

roomsController.get('/', async(_req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => getAllRooms(res), res);
})

roomsController.get('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => getRoom(Number(req.params.id), res), res);
})

roomsController.post('/', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => newRoom(req.body, res), res, true, req);
})

roomsController.put('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => editRoom(Number(req.params.id), req.body, res), res, true, req);
})

roomsController.delete('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => deleteRoom(Number(req.params.id), res), res, true, req);
})