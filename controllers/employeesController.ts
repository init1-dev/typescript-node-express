import express, { NextFunction, Request, Response } from 'express';
import { deleteEmployee, editEmployee, getAllEmployees, getEmployee, newEmployee } from '../services/employeesService';
import { authMiddleware } from '../middleware/auth';

export const employeesController = express.Router();

employeesController.get('/', async(_req: Request, res: Response, _next: NextFunction) => {
    res.json(getAllEmployees(res));
})

employeesController.get('/:id', async(req: Request, res: Response, _next: NextFunction) => {
    res.json(getEmployee(Number(req.params.id), res));
})

employeesController.post('/', authMiddleware, async(req: Request, res: Response, _next: NextFunction) => {
    res.json(newEmployee(req.body, res));
})

employeesController.put('/:id', authMiddleware, async(req: Request, res: Response, _next: NextFunction) => {
    res.json(editEmployee(Number(req.params.id), req.body, res));
})

employeesController.delete('/:id', authMiddleware, async(req: Request, res: Response, _next: NextFunction) => {
    res.json(deleteEmployee(Number(req.params.id), res));
})