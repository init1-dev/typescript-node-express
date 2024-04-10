import { AppError } from '../classes/AppError';
import { Booking, BookingModel } from '../models/Bookings';

export const getAllBookings = async(): Promise<Booking[]> => {
    const bookings = await BookingModel.find().populate('roomInfo');
    return bookings;
}

export const getBooking = async(id: any): Promise<Booking | null> => {
    const booking = await BookingModel.findById(id).populate('roomInfo');
    return booking;
}

export const newBooking = async(data: Booking): Promise<Booking> => {
    if(data !== undefined) {
        const booking = (await BookingModel.create(data)).populate('roomInfo');
        return booking;
    }
    throw new AppError(404, 'Error creating booking');
}

export const editBooking = async(id: any, data: Booking): Promise<Booking | null> => {
    if(data !== undefined){
        const booking = await BookingModel.findByIdAndUpdate(id, data, { new: true }).populate('roomInfo');
        return booking;
    } 
    throw new AppError(404, `Error editing booking #${id}`);
}

export const deleteBooking = async(id: any): Promise<string> => {
    const booking = await BookingModel.findByIdAndDelete(id);
    if(booking){
        return 'success';
    }
    throw new AppError(404, `Error deleting booking #${id}`);
}