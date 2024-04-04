import { Message } from '../interfaces/Messages';
import { ResponseStatus } from '../interfaces/responseStatus';
import { messagesDataFile } from '../util/dataFiles';
import { readDataFromFile, writeFile } from '../util/fileOperations';

const messagesData = readDataFromFile(messagesDataFile) as Message[];

export const getAllMessages = (): Message[] => {
    return messagesData;
}

export const getMessage = (id: number): Message | undefined => {
    return messagesData.find(message => message.id === id);
}

export const newMessage = (data: Message): ResponseStatus => {
    const messageToAdd = messagesData.findIndex(message => message.id === data?.id);
    if(data !== undefined && messageToAdd === -1) {
        messagesData.push(data);
        writeFile(messagesDataFile, messagesData);
        return {
            status: 200,
            message: `Message #${data.id} added successfully`
        }
    }
    return {
        status: 404,
        message: `Error creating message`
    }
}

export const editMessage = (id: number, data: Message): ResponseStatus => {
    const messagetoEdit = messagesData.findIndex(message => message.id === id);
    if(data !== undefined && messagetoEdit !== -1){
        messagesData.splice(messagetoEdit, 1, data);
        writeFile(messagesDataFile, messagesData);
        return {
            status: 200,
            message: `Message #${id} edited successfully`
        }
    }
    return {
        status: 404,
        message: `Error editing message ${id}`
    }
}

export const deleteMessage = (id: number): ResponseStatus => {
    const messageToDelete = messagesData.findIndex(message => message.id === id);
    if(messageToDelete !== -1){
        messagesData.splice(messageToDelete, 1);
        writeFile(messagesDataFile, messagesData);
        return {
            status: 200,
            message: `Message #${id} deleted successfully`
        }
    }
    return {
        status: 404,
        message: `Error deleting message ${id}`
    }
}