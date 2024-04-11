import { AppError } from '../classes/AppError';
import { Message, MessagesModel } from '../models/Messages';

export const getAllMessages = async(): Promise<Message[]> => {
    try {
        return await MessagesModel.find();
    } catch (error) {
        throw new AppError(500, 'Internal Server Error');
    }
}

export const getMessage = async(id: any): Promise<Message | null> => {
    try {
        return await MessagesModel.findById(id);
    } catch (error) {
        throw new AppError(500, 'Internal Server Error');
    }
}

export const newMessage = async(data: Message): Promise<Message> => {
    try {
        return await MessagesModel.create(data);
    } catch (error) {
        throw new AppError(500, 'Internal Server Error');
    }
}

export const editMessage = async(id: any, data: Message): Promise<Message | null> => {
    try {
        return await MessagesModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        throw new AppError(500, 'Internal Server Error');
    }
}

export const deleteMessage = async(id: any): Promise<Message | null> => {
    try {
        return await MessagesModel.findByIdAndDelete(id);
    } catch (error) {
        throw new AppError(500, 'Internal Server Error');
    }
}