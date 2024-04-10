import { Room, RoomsModel } from '../models/Rooms';
import { AppError } from '../classes/AppError';

export const getAllRooms = async(): Promise<Room[]> => {
    try {
        const rooms = await RoomsModel.find();
        return rooms;
    } catch (error) {
        throw new AppError(404, 'Not found');
    }
}

export const getRoom = async(id: any): Promise<Room | null> => {
    try {
        const room = await RoomsModel.findById(id);
        return room;
    } catch (error) {
        throw new AppError(404, 'Not found');
    }
}

export const newRoom = async(data: Room): Promise<Room> => {
    try {
        const room = await RoomsModel.create(data);
        return room;
    } catch (error) {
        throw new AppError(404, 'Error creating room');
    }
}

export const editRoom = async(id: any, data: Room): Promise<Room | null> => {
    try {
        const room = await RoomsModel.findByIdAndUpdate(id, data, { new: true });
        return room;
    } catch (error) {
        throw new AppError(404, `Error editing room #${id}`);
    }
}

export const deleteRoom = async(id: any): Promise<string> => {
    try {
        await RoomsModel.findByIdAndDelete(id);
        return "success"
    } catch (error) {
        throw new AppError(404, `Error deleting room #${id}`);
    }
}