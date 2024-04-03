import express, { NextFunction, Response } from 'express';
import { deleteEmployee, editEmployee, getAllEmployees, getEmployee, newEmployee } from '../services/employeesService';
import { RequestWithUser } from '../middleware/auth';
import { deployAction } from '../util/deployAction';

export const employeesRoutes = express.Router();

employeesRoutes.get('/', async(_req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => getAllEmployees(res), res);
})

employeesRoutes.get('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => getEmployee(Number(req.params.id), res), res);
})

employeesRoutes.post('/', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => newEmployee(req.body, res), res, true, req);
})

employeesRoutes.put('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => editEmployee(Number(req.params.id), req.body, res), res, true, req);
})

employeesRoutes.delete('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    deployAction(() => deleteEmployee(Number(req.params.id), res), res, true, req);
})