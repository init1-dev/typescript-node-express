import { NextFunction, Request, Response } from "express";
import { bookingSchema } from "../../models/Bookings";
import { AppError } from "../../classes/AppError";
import { roomSchema } from "../../models/Rooms";
import { employeeSchema } from "../../models/Employees";
import { messageSchema } from "../../models/Messages";

export const validateBooking = (req: Request, _res: Response, next: NextFunction) => {
    const bookingData = req.body;
    
    const { error } = bookingSchema.validate(bookingData, {abortEarly: false});

    if(error){
        return new AppError(400, error.details[0].message);
    };

    next();
};

export const validateRoom = (req: Request, _res: Response, next: NextFunction) => {
    const roomData = req.body;
    
    const { error } = roomSchema.validate(roomData, {abortEarly: false});

    if(error){
        return new AppError(400, error.details[0].message);
    };

    next();
};

export const validateEmployee = (req: Request, _res: Response, next: NextFunction) => {
    const employeeData = req.body;
    
    const { error } = employeeSchema.validate(employeeData, {abortEarly: false});

    if(error){
        return new AppError(400, error.details[0].message);
    };

    next();
};

export const validateMessage = (req: Request, _res: Response, next: NextFunction) => {
    const messageData = req.body;
    
    const { error } = messageSchema.validate(messageData, {abortEarly: false});

    if(error){
        return new AppError(400, error.details[0].message);
    };

    next();
};