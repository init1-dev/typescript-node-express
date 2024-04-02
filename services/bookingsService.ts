import { Booking } from '../interfaces/Bookings';
import { bookingsDataFile } from '../Helpers/dataFiles';
import { readDataFromFile, writeFile } from '../Helpers/fileOperations';

const bookingsData = readDataFromFile(bookingsDataFile) as Booking[];

export const getAllBookings = (): Booking[] => {
    return bookingsData;
}

export const getBooking = (id: number): Booking => {
    const booking = bookingsData.find(booking => booking.id === id) || {} as Booking;
    return booking;
}

export const newBooking = (data: Booking): string => {
    const bookingToAdd = bookingsData.findIndex(booking => booking.id === data?.id);
    if(data !== undefined && bookingToAdd === -1) {
        bookingsData.push(data);
        writeFile(bookingsDataFile, bookingsData);
        return `Booking #${data.id} added successfully`;
    }
    return `Error creating booking`;
}

export const editBooking = (id: number, data: Booking): string => {
    const bookingtoEdit = bookingsData.findIndex(booking => booking.id === id);
    if(data !== undefined && bookingtoEdit !== -1){
        bookingsData.splice(bookingtoEdit, 1, data);
        writeFile(bookingsDataFile, bookingsData);
        return `Booking #${id} edited successfully`;
    } 
    return `Error editing booking ${id}`;
}

export const deleteBooking = (id: number): string => {
    const bookingToDelete = bookingsData.findIndex(booking => booking.id === id);
    if(bookingToDelete !== -1){
        bookingsData.splice(bookingToDelete, 1);
        writeFile(bookingsDataFile, bookingsData);
        return `Booking #${id} deleted successfully`;
    }
    return `Error deleting booking ${id}`;
}