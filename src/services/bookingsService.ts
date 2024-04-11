import { AppError } from '../classes/AppError';
import { Booking, BookingModel } from '../models/Bookings';

export const getAllBookings = async(): Promise<Booking[]> => {
    try {
        return await BookingModel.find().populate('roomInfo');
    } catch (error) {
        throw new AppError(500, 'Internal Server Error');
    }
}

export const getBooking = async(id: any): Promise<Booking | null> => {
    try {
        return await BookingModel.findById(id).populate('roomInfo');
    } catch (error) {
        throw new AppError(500, 'Internal Server Error');
    }
}

export const newBooking = async(data: Booking): Promise<Booking> => {
    try {
        return (await BookingModel.create(data)).populate('roomInfo');
    } catch (error) {
        throw new AppError(500, 'Internal Server Error');
    }
}

export const editBooking = async(id: any, data: Booking): Promise<Booking | null> => {
    try {
        return (await BookingModel.findByIdAndUpdate(id, data, { new: true }).populate('roomInfo'));
    } catch (error) {
        throw new AppError(500, 'Internal Server Error');
    }
}

export const deleteBooking = async(id: any): Promise<Booking | null> => {
    try {
        return await BookingModel.findByIdAndDelete(id);
    } catch (error) {
        throw new AppError(500, 'Internal Server Error');
    }
}