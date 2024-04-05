import { roomsDataFile } from '../util/dataFiles';
import { readDataFromFile, writeFile } from '../util/fileOperations';
import { Room } from '../interfaces/Rooms';
import { AppError } from '../classes/AppError';

export const getAllRooms = (): Room[] => {
    const rooms = readDataFromFile(roomsDataFile) as Room[];
    return rooms;
}

export const getRoom = (id: number): Room | undefined => {
    return getAllRooms().find(room => room.id === id);
}

export const newRoom = (data: Room): Room => {
    const item = getAllRooms();
    const itemToAdd = item.findIndex(room => room.id === data?.id);
    if(data !== undefined && itemToAdd === -1) {
        item.push(data);
        writeFile(roomsDataFile, item);
        return data;
    }
    throw new AppError(404, 'Error creating room');
}

export const editRoom = (id: number, data: Room): Room => {
    const item = getAllRooms();
    const itemToEdit = item.findIndex(room => room.id === id);
    if(data !== undefined && itemToEdit !== -1){
        item.splice(itemToEdit, 1, data);
        writeFile(roomsDataFile, item);
        return item[itemToEdit];
    }
    throw new AppError(404, `Error editing room #${id}`);
}

export const deleteRoom = (id: number): string => {
    const item = getAllRooms();
    const itemToDelete = item.findIndex(room => room.id === id);
    if(itemToDelete !== -1){
        item.splice(itemToDelete, 1);
        writeFile(roomsDataFile, item);
        return "success"
    }
    throw new AppError(404, `Error deleting room #${id}`);
}