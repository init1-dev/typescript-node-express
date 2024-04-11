import express, { NextFunction, Request, Response } from 'express';
import { deleteEmployee, editEmployee, getAllEmployees, getEmployee, newEmployee } from '../services/employeesService';
import { parseResponse } from '../util/parseResponse';
import { AppError } from '../classes/AppError';

export const employeesRoutes = express.Router();

employeesRoutes.get('/', async(_req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await getAllEmployees();
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

employeesRoutes.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await getEmployee(req.params.id);
        if(responseData === null){
            throw new AppError(404, "Not found");
        }
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

employeesRoutes.post('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await newEmployee(req.body);
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

employeesRoutes.put('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await editEmployee(req.params.id, req.body);
        if(responseData === null){
            throw new AppError(404, `Error editing employee #${req.params.id}`);
        }
        parseResponse(responseData, res, 200);
    } catch (error) {
        next(error);
    }
})

employeesRoutes.delete('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await deleteEmployee(req.params.id);
        if(responseData === null){
            throw new AppError(404, `Error deleting employee #${req.params.id}`);
        }
        parseResponse("success", res, 200);
    } catch (error) {
        next(error);
    }
})