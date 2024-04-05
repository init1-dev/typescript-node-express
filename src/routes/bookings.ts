import express, { NextFunction, Request, Response } from 'express';
import { deleteBooking, editBooking, getAllBookings, getBooking, newBooking } from '../services/bookingsService';
import { parseResponse } from '../util/parseResponse';
import { AppError } from '../classes/AppError';

export const bookingsRoutes = express.Router();

bookingsRoutes.get('/', async(_req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = getAllBookings();
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

bookingsRoutes.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = getBooking(Number(req.params.id));
        if(!responseData){
            throw new AppError(404, "Not found");
        }
        parseResponse(responseData as object, res, 200);
    } catch (error) {
        next(error);
    }
})

bookingsRoutes.post('/', async( req: Request,  res: Response,  next: NextFunction ) => {
    try {   
        const responseData = newBooking(req.body);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

bookingsRoutes.put('/:id', async( req: Request,  res: Response,  next: NextFunction ) => {
    try {   
        const responseData = editBooking(Number(req.params.id), req.body)
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

bookingsRoutes.delete('/:id', async( req: Request,  res: Response,  next: NextFunction ) => {
    try {   
        const responseData = deleteBooking(Number(req.params.id));
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})