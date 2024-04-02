import express, { NextFunction, Request, Response } from 'express';
import path from 'path';

import { rootController } from './controllers/rootController';
import { roomsController } from './controllers/roomsController';
import { bookingsController } from './controllers/bookingsController';
import { employeesController } from './controllers/employeesController';
import { messagesController } from './controllers/messagesController';
import { loginController } from './controllers/loginController';

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

app.use('/', rootController);

app.use('/login', loginController);

app.use('/bookings', bookingsController);
app.use('/rooms', roomsController);
app.use('/employees', employeesController);
app.use('/messages', messagesController);