import { Booking } from '../interfaces/Bookings';
import { ResponseStatus } from '../interfaces/responseStatus';
import { bookingsDataFile } from '../util/dataFiles';
import { readDataFromFile, writeFile } from '../util/fileOperations';

const bookingsData = readDataFromFile(bookingsDataFile) as Booking[];

export const getAllBookings = (): Booking[] => {
    return bookingsData;
}

export const getBooking = (id: number): Booking | undefined => {
    return bookingsData.find(booking => booking.id === id);
}

export const newBooking = (data: Booking): ResponseStatus => {
    const bookingToAdd = bookingsData.findIndex(booking => booking.id === data?.id);
    if(data !== undefined && bookingToAdd === -1) {
        bookingsData.push(data);
        writeFile(bookingsDataFile, bookingsData);
        return {
            status: 200,
            message: `Booking #${data.id} added successfully`
        }
    }
    return {
        status: 404,
        message: `Error creating booking`
    }
}

export const editBooking = (id: number, data: Booking): ResponseStatus => {
    const bookingtoEdit = bookingsData.findIndex(booking => booking.id === id);
    if(data !== undefined && bookingtoEdit !== -1){
        bookingsData.splice(bookingtoEdit, 1, data);
        writeFile(bookingsDataFile, bookingsData);
        return {
            status: 404,
            message: `Booking #${id} edited successfully`
        }
    } 
    return {
        status: 200,
        message: `Error editing booking #${id}`
    }
}

export const deleteBooking = (id: number): ResponseStatus => {
    const bookingToDelete = bookingsData.findIndex(booking => booking.id === id);
    if(bookingToDelete !== -1){
        bookingsData.splice(bookingToDelete, 1);
        writeFile(bookingsDataFile, bookingsData);
        return {
            status: 404,
            message: `Booking #${id} deleted successfully`
        }
    }
    return {
        status: 200,
        message: `Error deleting booking #${id}`
    }
}