import { AppError } from '../classes/AppError';
import { Booking } from '../interfaces/Bookings';
import { bookingsDataFile } from '../util/dataFiles';
import { readDataFromFile, writeFile } from '../util/fileOperations';

export const getAllBookings = (): Booking[] => {
    const bookingsData = readDataFromFile(bookingsDataFile) as Booking[];
    return bookingsData;
}

export const getBooking = (id: number): Booking | undefined => {
    return getAllBookings().find(booking => booking.id === id);
}

export const newBooking = (data: Booking): Booking => {
    const item = getAllBookings();
    const itemToAdd = item.findIndex(booking => booking.id === data?.id);
    if(data !== undefined && itemToAdd === -1) {
        item.push(data);
        writeFile(bookingsDataFile, item);
        return data;
    }
    throw new AppError(404, 'Error creating booking');
}

export const editBooking = (id: number, data: Booking): Booking => {
    const item = getAllBookings();
    const itemToEdit = item.findIndex(booking => booking.id === id);
    if(data !== undefined && itemToEdit !== -1){
        item.splice(itemToEdit, 1, data);
        writeFile(bookingsDataFile, item);
        return item[itemToEdit];
    } 
    throw new AppError(404, `Error editing booking #${id}`);
}

export const deleteBooking = (id: number): string => {
    const item = getAllBookings();
    const itemToDelete = item.findIndex(booking => booking.id === id);
    if(itemToDelete !== -1){
        item.splice(itemToDelete, 1);
        writeFile(bookingsDataFile, item);
        return "success";
    }
    throw new AppError(404, `Error deleting booking #${id}`);
}