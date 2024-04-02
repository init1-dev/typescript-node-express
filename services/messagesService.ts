import { Message } from '../interfaces/Messages';
import { messagesDataFile } from '../Helpers/dataFiles';
import { readDataFromFile, writeFile } from '../Helpers/fileOperations';

const messagesData = readDataFromFile(messagesDataFile) as Message[];

export const getAllMessages = (): Message[] => {
    return messagesData;
}

export const getMessage = (id: number): Message => {
    const message = messagesData.find(message => message.id === id) || {} as Message;
    return message;
}

export const newMessage = (data: Message): string => {
    const messageToAdd = messagesData.findIndex(message => message.id === data?.id);
    if(data !== undefined && messageToAdd === -1) {
        messagesData.push(data);
        writeFile(messagesDataFile, messagesData);
        return `Message #${data.id} added successfully`;
    }
    return `Error creating message`;
}

export const editMessage = (id: number, data: Message): string => {
    const messagetoEdit = messagesData.findIndex(message => message.id === id);
    if(data !== undefined && messagetoEdit !== -1){
        messagesData.splice(messagetoEdit, 1, data);
        writeFile(messagesDataFile, messagesData);
        return `Message #${id} edited successfully`;
    } 
    return `Error editing message ${id}`;
}

export const deleteMessage = (id: number): string => {
    const messageToDelete = messagesData.findIndex(message => message.id === id);
    if(messageToDelete !== -1){
        messagesData.splice(messageToDelete, 1);
        writeFile(messagesDataFile, messagesData);
        return `Message #${id} deleted successfully`;
    }
    return `Error deleting message ${id}`;
}