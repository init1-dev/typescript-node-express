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
    const items = getAllRooms();
    const itemToAdd = items.findIndex(room => room.id === data?.id);
    if(data !== undefined && itemToAdd === -1) {
        items.push(data);
        writeFile(roomsDataFile, items);
        return data;
    }
    throw new AppError(404, 'Error creating room');
}

export const editRoom = (id: number, data: Room): Room => {
    const items = getAllRooms();
    const itemToEdit = items.findIndex(room => room.id === id);
    if(data !== undefined && itemToEdit !== -1){
        items.splice(itemToEdit, 1, data);
        writeFile(roomsDataFile, items);
        return items[itemToEdit];
    }
    throw new AppError(404, `Error editing room #${id}`);
}

export const deleteRoom = (id: number): string => {
    const items = getAllRooms();
    const itemToDelete = items.findIndex(room => room.id === id);
    if(itemToDelete !== -1){
        items.splice(itemToDelete, 1);
        writeFile(roomsDataFile, items);
        return "success"
    }
    throw new AppError(404, `Error deleting room #${id}`);
}