import express, { NextFunction, Request, Response } from 'express';
import { deleteBooking, editBooking, getAllBookings, getBooking, newBooking } from '../services/bookingsService';
import { parseResponse } from '../util/parseResponse';

export const bookingsRoutes = express.Router();

bookingsRoutes.get('/', async(_req: Request, res: Response, _next: NextFunction) => {
    try {
        const responseData = getAllBookings();
        if(responseData.length === 0) {
            return parseResponse('Bookings not found', res);
        }
        parseResponse(responseData, res, 200);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})

bookingsRoutes.get('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    try {
        const responseData = getBooking(Number(req.params.id));
        if(responseData === undefined) {
            return parseResponse('Booking not found', res);
        }
        parseResponse(responseData as object, res, 200);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})

bookingsRoutes.post('/', async( req: Request,  res: Response,  _next: NextFunction ) => {
    try {   
        const responseData = newBooking(req.body);
        parseResponse(responseData.message, res, responseData.status);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})

bookingsRoutes.put('/:id', async( req: Request,  res: Response,  _next: NextFunction ) => {
    try {   
        const responseData = editBooking(Number(req.params.id), req.body)
        parseResponse(responseData.message, res, responseData.status);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})

bookingsRoutes.delete('/:id', async( req: Request,  res: Response,  _next: NextFunction ) => {
    try {   
        const responseData = deleteBooking(Number(req.params.id));
        parseResponse(responseData.message, res, responseData.status);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})