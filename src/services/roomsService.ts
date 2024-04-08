import { Room, RoomsModel } from '../interfaces/Rooms';
import { AppError } from '../classes/AppError';

export const getAllRooms = async(): Promise<Room[]> => {
    const rooms = await RoomsModel.find();
    return rooms;
}

export const getRoom = async(id: any): Promise<Room | null> => {
    const room = await RoomsModel.findById(id);
    return room;
}

export const newRoom = async(data: Room): Promise<Room> => {
    if(data !== undefined) {
        const room = await RoomsModel.create(data);
        return room;
    }
    throw new AppError(404, 'Error creating room');
}

export const editRoom = async(id: any, data: Room): Promise<Room | null> => {
    if(data !== undefined){
        const room = await RoomsModel.findByIdAndUpdate(id, data, { new: true });
        return room;
    }
    throw new AppError(404, `Error editing room #${id}`);
}

export const deleteRoom = async(id: any): Promise<string> => {
    const room = await RoomsModel.findByIdAndDelete(id);
    if(room){
        return "success"
    }
    throw new AppError(404, `Error deleting room #${id}`);
}