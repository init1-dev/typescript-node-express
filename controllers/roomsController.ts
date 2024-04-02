import express, { NextFunction, Request, Response } from 'express';
import { deleteRoom, editRoom, getAllRooms, getRoom, newRoom } from '../services/roomsService';

export const roomsController = express.Router();

roomsController.get('/', async(_req: Request, res: Response, _next: NextFunction) => {
    res.json(getAllRooms());
})

roomsController.get('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    res.json(getRoom(Number(req.params.id)));
})

roomsController.post('/', async(req: Request, res: Response, _next: NextFunction) => {
    res.json(newRoom(req.body));
})

roomsController.put('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    res.json(editRoom(Number(req.params.id), req.body));
})

roomsController.delete('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    res.json(deleteRoom(Number(req.params.id)));
})