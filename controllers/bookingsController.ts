import express, { NextFunction, Request, Response } from 'express';
import { deleteBooking, editBooking, getAllBookings, getBooking, newBooking } from '../services/bookingsService';
import { authMiddleware } from '../middleware/auth';

export const bookingsController = express.Router();

bookingsController.get('/', async(_req: Request, res: Response, _next: NextFunction) => {
    res.json(getAllBookings());
})

bookingsController.get('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    res.json(getBooking(Number(req.params.id)));
})

bookingsController.use(authMiddleware);

bookingsController.post('/', async(req: Request, res: Response, _next: NextFunction) => {
    res.json(newBooking(req.body));
})

bookingsController.put('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    res.json(editBooking(Number(req.params.id), req.body));
})

bookingsController.delete('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    res.json(deleteBooking(Number(req.params.id)));
})