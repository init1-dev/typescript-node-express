import express, { NextFunction, Request, Response } from 'express';

export const app = express();

app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log('REQUEST LOGGER', req);
    
    next();
})

// app.use('/rooms')