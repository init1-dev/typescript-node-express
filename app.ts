import express, { NextFunction, Request, Response } from 'express';
import path from 'path';

import { rootRoutes } from './routes/root';
import { roomsRoutes } from './routes/rooms';
import { bookingsRoutes } from './routes/bookings';
import { employeesRoutes } from './routes/employees';
import { messagesRoutes } from './routes/messages';
import { loginRoutes } from './routes/login';
import { authMiddleware } from './middleware/auth';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log('REQUEST LOGGER', req.method, req.url);
    next();
});

app.use('/', rootRoutes);

app.use('/login', loginRoutes);

app.use('/bookings', authMiddleware, bookingsRoutes);
app.use('/rooms', authMiddleware, roomsRoutes);
app.use('/employees', authMiddleware, employeesRoutes);
app.use('/messages', authMiddleware, messagesRoutes);