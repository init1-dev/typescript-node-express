import { AppError } from '../classes/AppError';
import { Booking, BookingModel } from '../models/Bookings';

export const getAllBookings = async(): Promise<Booking[]> => {
    try {
        const bookings = await BookingModel.find().populate('roomInfo');
        return bookings;
    } catch (error) {
        throw new AppError(404, 'Not found');
    }
}

export const getBooking = async(id: any): Promise<Booking | null> => {
    try {
        const booking = await BookingModel.findById(id).populate('roomInfo');
        return booking;
    } catch (error) {
        throw new AppError(404, 'Not found');
    }
}

export const newBooking = async(data: Booking): Promise<Booking> => {
    try {
        const booking = (await BookingModel.create(data)).populate('roomInfo');
        return booking;
    } catch (error) {
        throw new AppError(404, 'Error creating booking');
    }
}

export const editBooking = async(id: any, data: Booking): Promise<Booking | null> => {
    try {
        const booking = await BookingModel.findByIdAndUpdate(id, data, { new: true }).populate('roomInfo');
        return booking;
    } catch (error) {
        throw new AppError(404, `Error editing booking #${id}`);
    }
}

export const deleteBooking = async(id: any): Promise<string> => {
    try {
        await BookingModel.findByIdAndDelete(id);
        return 'success';
    } catch (error) {
        throw new AppError(404, `Error deleting booking #${id}`);
    }
}