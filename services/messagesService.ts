import { Message } from '../interfaces/Messages';
import { messagesDataFile } from '../util/dataFiles';
import { readDataFromFile, writeFile } from '../util/fileOperations';
import { ParsedResponse, parseResponse } from '../util/parseResponse';

const messagesData = readDataFromFile(messagesDataFile) as Message[];

export const getAllMessages = (): Message[] | ParsedResponse => {
    if(messagesData.length === 0) {
        return parseResponse('Messages not found');
    }
    return messagesData;
}

export const getMessage = (id: number): Message | ParsedResponse => {
    const message = messagesData.find(message => message.id === id);
    if(message === undefined) {
        return parseResponse('Message not found');
    }
    return message;
}

export const newMessage = (data: Message): ParsedResponse => {
    const messageToAdd = messagesData.findIndex(message => message.id === data?.id);
    if(data !== undefined && messageToAdd === -1) {
        messagesData.push(data);
        writeFile(messagesDataFile, messagesData);
        return parseResponse(`Message #${data.id} added successfully`, 200);
    }
    return parseResponse(`Error creating message`);
}

export const editMessage = (id: number, data: Message): ParsedResponse => {
    const messagetoEdit = messagesData.findIndex(message => message.id === id);
    if(data !== undefined && messagetoEdit !== -1){
        messagesData.splice(messagetoEdit, 1, data);
        writeFile(messagesDataFile, messagesData);
        return parseResponse(`Message #${id} edited successfully`, 200);
    } 
    return parseResponse(`Error editing message ${id}`);
}

export const deleteMessage = (id: number): ParsedResponse => {
    const messageToDelete = messagesData.findIndex(message => message.id === id);
    if(messageToDelete !== -1){
        messagesData.splice(messageToDelete, 1);
        writeFile(messagesDataFile, messagesData);
        return parseResponse(`Message #${id} deleted successfully`, 200);
    }
    return parseResponse(`Error deleting message ${id}`);
}