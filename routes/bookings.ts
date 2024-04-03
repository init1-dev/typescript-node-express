import express, { NextFunction, Request, Response } from 'express';
import { deleteBooking, editBooking, getAllBookings, getBooking, newBooking } from '../services/bookingsService';
import { RequestWithUser } from '../middleware/auth';
import { deployAction } from '../util/deployAction';

export const bookingsRoutes = express.Router();

bookingsRoutes.get('/', async(_req: Request, res: Response, _next: NextFunction) => {
    try {
        deployAction(() => getAllBookings(res), res);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json(error);
    }
})

bookingsRoutes.get('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    try {
        deployAction(() => getBooking(Number(req.params.id), res), res);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json(error);
    }
})

bookingsRoutes.post('/', async( req: RequestWithUser,  res: Response,  _next: NextFunction ) => {
    try {   
        deployAction(() => newBooking(req.body, res), res, true, req);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json(error);
    }
})

bookingsRoutes.put('/:id', async( req: RequestWithUser,  res: Response,  _next: NextFunction ) => {
    try {   
        deployAction(() => editBooking(Number(req.params.id), req.body, res), res, true, req);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json(error);
    }
})

bookingsRoutes.delete('/:id', async( req: RequestWithUser,  res: Response,  _next: NextFunction ) => {
    try {   
        deployAction(() => deleteBooking(Number(req.params.id), res), res, true, req);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json(error);
    }
})