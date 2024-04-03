import express, { NextFunction, Request, Response } from 'express';
import { deleteBooking, editBooking, getAllBookings, getBooking, newBooking } from '../services/bookingsService';
import { RequestWithUser } from '../middleware/auth';
import { deployAction } from '../util/deployAction';

export const bookingsRoutes = express.Router();

bookingsRoutes.get('/', async(_req: Request, res: Response, _next: NextFunction) => {
    deployAction(() => getAllBookings(res), res);
})

bookingsRoutes.get('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    deployAction(() => getBooking(Number(req.params.id), res), res);
})

bookingsRoutes.post('/', async( req: RequestWithUser,  res: Response,  _next: NextFunction ) => {
    deployAction(() => newBooking(req.body, res), res, true, req);
})

bookingsRoutes.put('/:id', async( req: RequestWithUser,  res: Response,  _next: NextFunction ) => {
    deployAction(() => editBooking(Number(req.params.id), req.body, res), res, true, req);
})

bookingsRoutes.delete('/:id', async( req: RequestWithUser,  res: Response,  _next: NextFunction ) => {
    deployAction(() => deleteBooking(Number(req.params.id), res), res, true, req);
})