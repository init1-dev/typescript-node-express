import express, { NextFunction, Response } from 'express';
import { deleteEmployee, editEmployee, getAllEmployees, getEmployee, newEmployee } from '../services/employeesService';
import { RequestWithUser } from '../middleware/auth';
import { deployAction } from '../util/deployAction';

export const employeesController = express.Router();

employeesController.get('/', async(_req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => getAllEmployees(res), res);
})

employeesController.get('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => getEmployee(Number(req.params.id), res), res);
})

employeesController.post('/', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => newEmployee(req.body, res), res, true, req);
})

employeesController.put('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => editEmployee(Number(req.params.id), req.body, res), res, true, req);
})

employeesController.delete('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => deleteEmployee(Number(req.params.id), res), res, true, req);
})