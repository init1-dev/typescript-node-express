import { roomsDataFile } from '../util/dataFiles';
import { readDataFromFile, writeFile } from '../util/fileOperations';
import { Room } from '../interfaces/Rooms';
import { ResponseStatus } from '../interfaces/responseStatus';

const roomsData = readDataFromFile(roomsDataFile) as Room[];

export const getAllRooms = (): Room[] => {
    return roomsData;
}

export const getRoom = (id: number): Room | undefined => {
    return roomsData.find(room => room.id === id);
}

export const newRoom = (data: Room): ResponseStatus => {
    const roomToAdd = roomsData.findIndex(room => room.id === data?.id);
    if(data !== undefined && roomToAdd === -1) {
        roomsData.push(data);
        writeFile(roomsDataFile, roomsData);
        return {
            status: 200,
            message: `Room #${data.id} added successfully`
        }
    }
    return {
        status: 404,
        message: `Error creating room`
    }
}

export const editRoom = (id: number, data: Room): ResponseStatus => {
    const roomtoEdit = roomsData.findIndex(room => room.id === id);
    if(data !== undefined && roomtoEdit !== -1){
        roomsData.splice(roomtoEdit, 1, data);
        writeFile(roomsDataFile, roomsData);
        return {
            status: 200,
            message: `Room #${id} edited successfully`
        }
    }
    return {
        status: 404,
        message: `Error editing room ${id}`
    }
}

export const deleteRoom = (id: number): ResponseStatus => {
    const roomToDelete = roomsData.findIndex(room => room.id === id);
    if(roomToDelete !== -1){
        roomsData.splice(roomToDelete, 1);
        writeFile(roomsDataFile, roomsData);
        return {
            status: 200,
            message: `Room #${id} deleted successfully`
        }
    }
    return {
        status: 404,
        message: `Error deleting room ${id}`
    }
}