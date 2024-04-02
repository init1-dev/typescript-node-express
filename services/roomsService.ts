
import { roomsDataFile } from '../Helpers/dataFiles';
import { readDataFromFile, writeFile } from '../Helpers/fileOperations';
import { ParsedResponse, parseResponse } from '../Helpers/parseResponse';
import { Room } from '../interfaces/Rooms';

const roomsData = readDataFromFile(roomsDataFile) as Room[];

export const getAllRooms = (): Room[] | ParsedResponse => {
    if(roomsData.length === 0) {
        return parseResponse('Rooms not found');
    }
    return roomsData;
}

export const getRoom = (id: number): Room | ParsedResponse => {
    const room = roomsData.find(room => room.id === id) || {} as Room;
    if(room === undefined) {
        return parseResponse('Room not found');
    }
    return room;
}

export const newRoom = (data: Room): ParsedResponse => {
    const roomToAdd = roomsData.findIndex(room => room.id === data?.id);
    if(data !== undefined && roomToAdd === -1) {
        roomsData.push(data);
        writeFile(roomsDataFile, roomsData);
        return parseResponse(`Room #${data.id} added successfully`, 200);
    }
    return parseResponse(`Error creating room`);
}

export const editRoom = (id: number, data: Room): ParsedResponse => {
    const roomtoEdit = roomsData.findIndex(room => room.id === id);
    if(data !== undefined && roomtoEdit !== -1){
        roomsData.splice(roomtoEdit, 1, data);
        writeFile(roomsDataFile, roomsData);
        return parseResponse(`Room #${id} edited successfully`, 200);
    } 
    return parseResponse(`Error editing room ${id}`);
}

export const deleteRoom = (id: number): ParsedResponse => {
    const roomToDelete = roomsData.findIndex(room => room.id === id);
    if(roomToDelete !== -1){
        roomsData.splice(roomToDelete, 1);
        writeFile(roomsDataFile, roomsData);
        return parseResponse(`Room #${id} deleted successfully`, 200);
    }
    return parseResponse(`Error deleting room ${id}`);
}