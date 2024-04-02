import { Booking } from '../interfaces/Bookings';
import { bookingsDataFile } from '../Helpers/dataFiles';
import { readDataFromFile, writeFile } from '../Helpers/fileOperations';
import { ParsedResponse, parseResponse } from '../Helpers/parseResponse';

const bookingsData = readDataFromFile(bookingsDataFile) as Booking[];

export const getAllBookings = (): Booking[] | ParsedResponse => {
    if(bookingsData.length === 0) {
        return parseResponse('Bookings not found');
    }
    return bookingsData;
}

export const getBooking = (id: number): Booking | ParsedResponse => {
    const booking = bookingsData.find(booking => booking.id === id) || {} as Booking;
    if(booking === undefined) {
        return parseResponse('Booking not found');
    }
    return booking;
}

export const newBooking = (data: Booking): ParsedResponse => {
    const bookingToAdd = bookingsData.findIndex(booking => booking.id === data?.id);
    if(data !== undefined && bookingToAdd === -1) {
        bookingsData.push(data);
        writeFile(bookingsDataFile, bookingsData);
        return parseResponse(`Booking #${data.id} added successfully`, 200);
    }
    return parseResponse(`Error creating booking`);
}

export const editBooking = (id: number, data: Booking): ParsedResponse => {
    const bookingtoEdit = bookingsData.findIndex(booking => booking.id === id);
    if(data !== undefined && bookingtoEdit !== -1){
        bookingsData.splice(bookingtoEdit, 1, data);
        writeFile(bookingsDataFile, bookingsData);
        return parseResponse(`Booking #${id} edited successfully`, 200);
    } 
    return parseResponse(`Error editing booking #${id}`);
}

export const deleteBooking = (id: number): ParsedResponse => {
    const bookingToDelete = bookingsData.findIndex(booking => booking.id === id);
    if(bookingToDelete !== -1){
        bookingsData.splice(bookingToDelete, 1);
        writeFile(bookingsDataFile, bookingsData);
        return parseResponse(`Booking #${id} deleted successfully`, 200);
    }
    return parseResponse(`Error deleting booking #${id}`);
}