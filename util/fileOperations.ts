import fs from 'fs';
import { Booking } from '../interfaces/Bookings';
import { Room } from '../interfaces/Rooms';
import { Employee } from '../interfaces/Employees';
import { Message } from '../interfaces/Messages';

export interface ErrorResponse {
    status: number;
    message: string;
}

export const readDataFromFile = (fileName: string): Booking[] | Room[] | Employee[] | Message[] => {
    const data = fs.readFileSync(fileName).toString();
    return JSON.parse(data);
}

export const writeFile = (fileName: string, data: Booking[] | Room[] | Employee[] | Message[]): void => {
    const dataToWrite = JSON.stringify(data);
    fs.writeFileSync(fileName, dataToWrite);
}