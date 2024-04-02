import express, { Request, Response } from 'express';

export const employeesController = express.Router();

employeesController.get('/', async(_req: Request, res: Response) => {
    res.json({
        path: "employees"
    });
})