import express, { NextFunction, Request, Response } from 'express';
import { deleteEmployee, editEmployee, getAllEmployees, getEmployee, newEmployee } from '../services/employeesService';
import { parseResponse } from '../util/parseResponse';

export const employeesRoutes = express.Router();

employeesRoutes.get('/', async(_req: Request, res: Response, _next: NextFunction) => {
    try {
        const responseData = getAllEmployees();
        if(responseData.length === 0) {
            return parseResponse('Employees not found', res);
        }
        parseResponse(responseData, res, 200);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json(error);
    }
})

employeesRoutes.get('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    try {
        const responseData = getEmployee(Number(req.params.id));
        if(responseData === undefined) {
            return parseResponse('Booking not found', res);
        }
        parseResponse(responseData as object, res, 200);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json(error);
    }
})

employeesRoutes.post('/', async(req: Request, res: Response, _next: NextFunction) => {
    try {
        const responseData = newEmployee(req.body);
        parseResponse(responseData.message, res, responseData.status);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json(error);
    }
})

employeesRoutes.put('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    try {
        const responseData = editEmployee(Number(req.params.id), req.body);
        parseResponse(responseData.message, res, responseData.status);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json(error);
    }
})

employeesRoutes.delete('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    try {
        const responseData = deleteEmployee(Number(req.params.id));
        parseResponse(responseData.message, res, responseData.status);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json(error);
    }
})