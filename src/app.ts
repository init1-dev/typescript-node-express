import express, { NextFunction, Request, Response } from 'express';

import { rootRoutes } from './routes/root';
import { roomsRoutes } from './routes/rooms';
import { bookingsRoutes } from './routes/bookings';
import { employeesRoutes } from './routes/employees';
import { messagesRoutes } from './routes/messages';
import { loginRoutes } from './routes/login';
import { authMiddleware } from './middleware/auth';
import { parseResponse } from './util/parseResponse';
import { mongooseConnect } from './util/mongoose/mongooseConnect';
import cors from 'cors';
import { origins } from './util/cors/origins';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('src/public'));

app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log('REQUEST LOGGER', req.method, req.url);
    next();
});

app.use(cors({
	origin: origins
}))

app.use('/', rootRoutes);

mongooseConnect();

app.use('/login', loginRoutes);

app.use('/bookings', authMiddleware, bookingsRoutes);
app.use('/rooms', authMiddleware, roomsRoutes);
app.use('/employees', authMiddleware, employeesRoutes);
app.use('/messages', authMiddleware, messagesRoutes);

app.use((_req: express.Request, res: express.Response, _next: express.NextFunction) => {
    parseResponse("Invalid path, please refer to the documentation to see available routes.", res);
});

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    res.status(err.status || 500).send({
        status: err.status,
        message: err.message
    });
});