import { roomsDataFile } from '../util/dataFiles';
import { readDataFromFile, writeFile } from '../util/fileOperations';
import { parseResponse } from '../util/parseResponse';
import { Room } from '../interfaces/Rooms';
import { Response } from 'express';

const roomsData = readDataFromFile(roomsDataFile) as Room[];

export const getAllRooms = (res: Response): Room[] | void => {
    if(roomsData.length === 0) {
        return parseResponse('Rooms not found', res);
    }
    return parseResponse(roomsData, res, 200);
}

export const getRoom = (id: number, res: Response): Room | void => {
    const room = roomsData.find(room => room.id === id);
    if(room === undefined) {
        return parseResponse('Room not found', res);
    }
    return parseResponse(room, res, 200);
}

export const newRoom = (data: Room, res: Response): void => {
    const roomToAdd = roomsData.findIndex(room => room.id === data?.id);
    if(data !== undefined && roomToAdd === -1) {
        roomsData.push(data);
        writeFile(roomsDataFile, roomsData);
        return parseResponse(`Room #${data.id} added successfully`, res, 200);
    }
    return parseResponse(`Error creating room`, res);
}

export const editRoom = (id: number, data: Room, res: Response): void => {
    const roomtoEdit = roomsData.findIndex(room => room.id === id);
    if(data !== undefined && roomtoEdit !== -1){
        roomsData.splice(roomtoEdit, 1, data);
        writeFile(roomsDataFile, roomsData);
        return parseResponse(`Room #${id} edited successfully`, res, 200);
    } 
    return parseResponse(`Error editing room ${id}`, res);
}

export const deleteRoom = (id: number, res: Response): void => {
    const roomToDelete = roomsData.findIndex(room => room.id === id);
    if(roomToDelete !== -1){
        roomsData.splice(roomToDelete, 1);
        writeFile(roomsDataFile, roomsData);
        return parseResponse(`Room #${id} deleted successfully`, res, 200);
    }
    return parseResponse(`Error deleting room ${id}`, res);
}