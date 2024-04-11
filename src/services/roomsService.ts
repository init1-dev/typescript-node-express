import { Room, RoomsModel } from '../models/Rooms';
import { AppError } from '../classes/AppError';

export const getAllRooms = async(): Promise<Room[]> => {
    try {
        return await RoomsModel.find();
    } catch (error) {
        throw new AppError(500, 'Internal Server Error');
    }
}

export const getRoom = async(id: any): Promise<Room | null> => {
    try {
        return await RoomsModel.findById(id);
    } catch (error) {
        throw new AppError(500, 'Internal Server Error');
    }
}

export const newRoom = async(data: Room): Promise<Room> => {
    try {
        return await RoomsModel.create(data);
    } catch (error) {
        throw new AppError(500, 'Internal Server Error');
    }
}

export const editRoom = async(id: any, data: Room): Promise<Room | null> => {
    try {
        return await RoomsModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        throw new AppError(500, 'Internal Server Error');
    }
}

export const deleteRoom = async(id: any): Promise<Room | null> => {
    try {
        return await RoomsModel.findByIdAndDelete(id);
    } catch (error) {
        throw new AppError(500, 'Internal Server Error');
    }
}