import express, { NextFunction, Request, Response } from 'express';
import { getAll, getOne, newItem, editItem, deleteItem } from '../services/bookingsService';
import { parseResponse } from '../util/parseResponse';
import { validateBooking } from '../util/validations/joiValidationMiddlewares';

export const bookingsRoutes = express.Router();

bookingsRoutes.get('/', async(_req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await getAll();
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

bookingsRoutes.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await getOne(req.params.id);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

bookingsRoutes.post('/', validateBooking, async( req: Request,  res: Response,  next: NextFunction ) => {
    try {   
        const responseData = await newItem(req.body);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

bookingsRoutes.put('/:id', validateBooking, async( req: Request,  res: Response,  next: NextFunction ) => {
    try {   
        const responseData = await editItem(req.params.id, req.body);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

bookingsRoutes.delete('/:id', async( req: Request,  res: Response,  next: NextFunction ) => {
    try {   
        await deleteItem(req.params.id);
        parseResponse("success", res, 200);
    } catch (error) {
        next(error);
    }
})