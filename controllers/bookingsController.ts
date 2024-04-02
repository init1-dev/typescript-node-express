import express, { NextFunction, Request, Response } from 'express';
import { deleteBooking, editBooking, getAllBookings, getBooking, newBooking } from '../services/bookingsService';
import { authMiddleware } from '../middleware/auth';

export const bookingsController = express.Router();

bookingsController.get('/', async(_req: Request, res: Response, _next: NextFunction) => {
    res.json(getAllBookings(res));
})

bookingsController.get('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    res.json(getBooking(Number(req.params.id), res));
})

bookingsController.post('/', authMiddleware, async(req: Request, res: Response, _next: NextFunction) => {
    res.json(newBooking(req.body, res));
})

bookingsController.put('/:id', authMiddleware, async(req: Request, res: Response, _next: NextFunction) => {
    res.json(editBooking(Number(req.params.id), req.body, res));
})

bookingsController.delete('/:id', authMiddleware, async(req: Request, res: Response, _next: NextFunction) => {
    res.json(deleteBooking(Number(req.params.id), res));
})