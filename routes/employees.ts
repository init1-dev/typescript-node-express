import express, { NextFunction, Request, Response } from 'express';
import { deleteEmployee, editEmployee, getAllEmployees, getEmployee, newEmployee } from '../services/employeesService';
import { parseResponse } from '../util/parseResponse';

export const employeesRoutes = express.Router();

employeesRoutes.get('/', async(_req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = getAllEmployees();
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

employeesRoutes.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = getEmployee(Number(req.params.id));
        parseResponse(responseData as object, res, 200);
    } catch (error) {
        next(error);
    }
})

employeesRoutes.post('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = newEmployee(req.body);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

employeesRoutes.put('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = editEmployee(Number(req.params.id), req.body);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

employeesRoutes.delete('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = deleteEmployee(Number(req.params.id));
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})