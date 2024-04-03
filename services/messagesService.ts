import { Message } from '../interfaces/Messages';
import { messagesDataFile } from '../util/dataFiles';
import { readDataFromFile, writeFile } from '../util/fileOperations';
import { parseResponse } from '../util/parseResponse';
import { Response } from 'express';

const messagesData = readDataFromFile(messagesDataFile) as Message[];

export const getAllMessages = (res: Response): Message[] | void => {
    if(messagesData.length === 0) {
        return parseResponse('Messages not found', res);
    }
    return parseResponse(messagesData, res, 200);
}

export const getMessage = (id: number, res: Response): Message | void => {
    const message = messagesData.find(message => message.id === id);
    if(message === undefined) {
        return parseResponse('Message not found', res);
    }
    return parseResponse(message, res, 200);
}

export const newMessage = (data: Message, res: Response): void => {
    const messageToAdd = messagesData.findIndex(message => message.id === data?.id);
    if(data !== undefined && messageToAdd === -1) {
        messagesData.push(data);
        writeFile(messagesDataFile, messagesData);
        return parseResponse(`Message #${data.id} added successfully`, res, 200);
    }
    return parseResponse(`Error creating message`, res);
}

export const editMessage = (id: number, data: Message, res: Response): void => {
    const messagetoEdit = messagesData.findIndex(message => message.id === id);
    if(data !== undefined && messagetoEdit !== -1){
        messagesData.splice(messagetoEdit, 1, data);
        writeFile(messagesDataFile, messagesData);
        return parseResponse(`Message #${id} edited successfully`, res, 200);
    } 
    return parseResponse(`Error editing message ${id}`, res);
}

export const deleteMessage = (id: number, res: Response): void => {
    const messageToDelete = messagesData.findIndex(message => message.id === id);
    if(messageToDelete !== -1){
        messagesData.splice(messageToDelete, 1);
        writeFile(messagesDataFile, messagesData);
        return parseResponse(`Message #${id} deleted successfully`, res, 200);
    }
    return parseResponse(`Error deleting message ${id}`, res);
}