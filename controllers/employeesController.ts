import express, { NextFunction, Request, Response } from 'express';
import { deleteEmployee, editEmployee, getAllEmployees, getEmployee, newEmployee } from '../services/employeesService';
import { authMiddleware } from '../middleware/auth';

export const employeesController = express.Router();

employeesController.get('/', async(_req: Request, res: Response, _next: NextFunction) => {
    res.json(getAllEmployees());
})

employeesController.get('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    res.json(getEmployee(Number(req.params.id)));
})

employeesController.use(authMiddleware);

employeesController.post('/', async(req: Request, res: Response, _next: NextFunction) => {
    res.json(newEmployee(req.body));
})

employeesController.put('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    res.json(editEmployee(Number(req.params.id), req.body));
})

employeesController.delete('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    res.json(deleteEmployee(Number(req.params.id)));
})