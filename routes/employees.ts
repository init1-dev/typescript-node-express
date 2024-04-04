import express, { NextFunction, Response } from 'express';
import { deleteEmployee, editEmployee, getAllEmployees, getEmployee, newEmployee } from '../services/employeesService';
import { RequestWithUser } from '../middleware/auth';
import { deployAction } from '../util/deployAction';

export const employeesRoutes = express.Router();

employeesRoutes.get('/', async(_req: RequestWithUser, res: Response, _next: NextFunction) => {
    try {   
        deployAction(() => getAllEmployees(res), res);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})

employeesRoutes.get('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    try {   
        deployAction(() => getEmployee(Number(req.params.id), res), res);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})

employeesRoutes.post('/', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    try {   
        deployAction(() => newEmployee(req.body, res), res, true, req);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})

employeesRoutes.put('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    try {   
        deployAction(() => editEmployee(Number(req.params.id), req.body, res), res, true, req);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})

employeesRoutes.delete('/:id', async(req: RequestWithUser, res: Response, _next: NextFunction) => {
    try {   
        deployAction(() => deleteEmployee(Number(req.params.id), res), res, true, req);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({error});
    }
})