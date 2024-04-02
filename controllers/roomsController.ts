import express, { Request, Response } from 'express';

export const roomsController = express.Router();

roomsController.get('/', async(_req: Request, res: Response) => {
    res.json({
        path: "rooms"
    });
})