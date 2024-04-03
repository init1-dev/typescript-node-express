import { Booking } from '../interfaces/Bookings';
import { bookingsDataFile } from '../util/dataFiles';
import { readDataFromFile, writeFile } from '../util/fileOperations';
import { parseResponse } from '../util/parseResponse';
import { Response } from 'express';

const bookingsData = readDataFromFile(bookingsDataFile) as Booking[];

export const getAllBookings = (res: Response): Booking[] | void => {
    if(bookingsData.length === 0) {
        return parseResponse('Bookings not found', res);
    }
    return parseResponse(bookingsData, res, 200);
}

export const getBooking = (id: number, res: Response): Booking | void => {
    const booking = bookingsData.find(booking => booking.id === id);
    if(booking === undefined) {
        return parseResponse('Booking not found', res);
    }
    return parseResponse(booking, res, 200);
}

export const newBooking = (data: Booking, res: Response): void => {
    const bookingToAdd = bookingsData.findIndex(booking => booking.id === data?.id);
    if(data !== undefined && bookingToAdd === -1) {
        bookingsData.push(data);
        writeFile(bookingsDataFile, bookingsData);
        return parseResponse(`Booking #${data.id} added successfully`, res, 200);
    }
    return parseResponse(`Error creating booking`, res);
}

export const editBooking = (id: number, data: Booking, res: Response): void => {
    const bookingtoEdit = bookingsData.findIndex(booking => booking.id === id);
    if(data !== undefined && bookingtoEdit !== -1){
        bookingsData.splice(bookingtoEdit, 1, data);
        writeFile(bookingsDataFile, bookingsData);
        return parseResponse(`Booking #${id} edited successfully`, res, 200);
    } 
    return parseResponse(`Error editing booking #${id}`, res);
}

export const deleteBooking = (id: number, res: Response): void => {
    const bookingToDelete = bookingsData.findIndex(booking => booking.id === id);
    if(bookingToDelete !== -1){
        bookingsData.splice(bookingToDelete, 1);
        writeFile(bookingsDataFile, bookingsData);
        return parseResponse(`Booking #${id} deleted successfully`, res, 200);
    }
    return parseResponse(`Error deleting booking #${id}`, res);
}