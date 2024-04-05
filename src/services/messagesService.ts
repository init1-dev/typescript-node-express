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
    const items = getAllMessages();
    const itemToAdd = items.findIndex(message => message.id === data?.id);
    if(data !== undefined && itemToAdd === -1) {
        items.push(data);
        writeFile(messagesDataFile, items);
        return data;
    }
    throw new AppError(404, 'Error creating message');
}

export const editMessage = (id: number, data: Message): Message => {
    const items = getAllMessages();
    const itemToEdit = items.findIndex(message => message.id === id);
    if(data !== undefined && itemToEdit !== -1){
        items.splice(itemToEdit, 1, data);
        writeFile(messagesDataFile, items);
        return items[itemToEdit];
    }
    throw new AppError(404, `Error editing message #${id}`);
}

export const deleteMessage = (id: number): string => {
    const items = getAllMessages();
    const itemToDelete = items.findIndex(message => message.id === id);
    if(itemToDelete !== -1){
        items.splice(itemToDelete, 1);
        writeFile(messagesDataFile, items);
        return "success";
    }
    throw new AppError(404, `Error deleting message #${id}`);
}