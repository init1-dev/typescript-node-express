
import { roomsDataFile } from '../Helpers/dataFiles';
import { readDataFromFile, writeFile } from '../Helpers/fileOperations';
import { Room } from '../interfaces/Rooms';

const roomsData = readDataFromFile(roomsDataFile) as Room[];

export const getAllRooms = (): Room[] => {
    return roomsData;
}

export const getRoom = (id: number): Room => {
    const room = roomsData.find(room => room.id === id) || {} as Room;
    return room;
}

export const newRoom = (data: Room): string => {
    const roomToAdd = roomsData.findIndex(room => room.id === data?.id);
    if(data !== undefined && roomToAdd === -1) {
        roomsData.push(data);
        writeFile(roomsDataFile, roomsData);
        return `Room #${data.id} added successfully`;
    }
    return `Error creating room`;
}

export const editRoom = (id: number, data: Room): string => {
    const roomtoEdit = roomsData.findIndex(room => room.id === id);
    if(data !== undefined && roomtoEdit !== -1){
        roomsData.splice(roomtoEdit, 1, data);
        writeFile(roomsDataFile, roomsData);
        return `Room #${id} edited successfully`;
    } 
    return `Error editing room ${id}`;
}

export const deleteRoom = (id: number): string => {
    const roomToDelete = roomsData.findIndex(room => room.id === id);
    if(roomToDelete !== -1){
        roomsData.splice(roomToDelete, 1);
        writeFile(roomsDataFile, roomsData);
        return `Room #${id} deleted successfully`;
    }
    return `Error deleting room ${id}`;
}