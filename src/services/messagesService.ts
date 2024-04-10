import { AppError } from '../classes/AppError';
import { Message, MessagesModel } from '../models/Messages';

export const getAllMessages = async(): Promise<Message[]> => {
    try {
        const messages = await MessagesModel.find();
        return messages;
    } catch (error) {
        throw new AppError(404, 'Not found');
    }
}

export const getMessage = async(id: any): Promise<Message | null> => {
    try {
        const message = MessagesModel.findById(id);
        return message;
    } catch (error) {
        throw new AppError(404, 'Not found');
    }
}

export const newMessage = async(data: Message): Promise<Message> => {
    try {
        const message = await MessagesModel.create(data);
        return message;
    } catch (error) {
        throw new AppError(404, 'Error creating message');
    }
}

export const editMessage = async(id: any, data: Message): Promise<Message | null> => {
    try {
        const message = await MessagesModel.findByIdAndUpdate(id, data, { new: true });
        return message;
    } catch (error) {
        throw new AppError(404, `Error editing message #${id}`);
    }
}

export const deleteMessage = async(id: any): Promise<string> => {
    try {
        await MessagesModel.findByIdAndDelete(id);
        return "success";
    } catch (error) {
        throw new AppError(404, `Error deleting message #${id}`);
    }
}