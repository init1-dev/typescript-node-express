import { AppError } from '../classes/AppError';
import { Message } from '../interfaces/Messages';
import { messagesDataFile } from '../util/dataFiles';
import { readDataFromFile, writeFile } from '../util/fileOperations';

export const getAllMessages = (): Message[] => {
    const messagesData = readDataFromFile(messagesDataFile) as Message[];
    return messagesData;
}

export const getMessage = (id: number): Message | undefined => {
    return getAllMessages().find(message => message.id === id);
}

export const newMessage = (data: Message): Message => {
    const item = getAllMessages();
    const itemToAdd = item.findIndex(message => message.id === data?.id);
    if(data !== undefined && itemToAdd === -1) {
        item.push(data);
        writeFile(messagesDataFile, item);
        return data;
    }
    throw new AppError(404, 'Error creating message');
}

export const editMessage = (id: number, data: Message): Message => {
    const item = getAllMessages();
    const itemToEdit = item.findIndex(message => message.id === id);
    if(data !== undefined && itemToEdit !== -1){
        item.splice(itemToEdit, 1, data);
        writeFile(messagesDataFile, item);
        return item[itemToEdit];
    }
    throw new AppError(404, `Error editing message #${id}`);
}

export const deleteMessage = (id: number): string => {
    const item = getAllMessages();
    const itemToDelete = item.findIndex(message => message.id === id);
    if(itemToDelete !== -1){
        item.splice(itemToDelete, 1);
        writeFile(messagesDataFile, item);
        return "success";
    }
    throw new AppError(404, `Error deleting message #${id}`);
}