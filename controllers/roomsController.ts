import express, { NextFunction, Request, Response } from 'express';
import { deleteRoom, editRoom, getAllRooms, getRoom, newRoom } from '../services/roomsService';
import { authMiddleware } from '../middleware/auth';

export const roomsController = express.Router();

roomsController.get('/', async(_req: Request, res: Response, _next: NextFunction) => {
    res.json(getAllRooms(res));
})

roomsController.get('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    res.json(getRoom(Number(req.params.id), res));
})

roomsController.post('/', authMiddleware, async(req: Request, res: Response, _next: NextFunction) => {
    res.json(newRoom(req.body, res));
})

roomsController.put('/:id', authMiddleware, async(req: Request, res: Response, _next: NextFunction) => {
    res.json(editRoom(Number(req.params.id), req.body, res));
})

roomsController.delete('/:id', authMiddleware, async(req: Request, res: Response, _next: NextFunction) => {
    res.json(deleteRoom(Number(req.params.id), res));
})