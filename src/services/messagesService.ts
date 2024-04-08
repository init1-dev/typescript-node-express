import { AppError } from '../classes/AppError';
import { Message, MessagesModel } from '../interfaces/Messages';

export const getAllMessages = async(): Promise<Message[]> => {
    const messages = await MessagesModel.find();
    return messages;
}

export const getMessage = async(id: any): Promise<Message | null> => {
    const message = MessagesModel.findById(id);
    return message;
}

export const newMessage = async(data: Message): Promise<Message> => {
    if(data !== undefined) {
        const message = await MessagesModel.create(data);
        return message;
    }
    throw new AppError(404, 'Error creating message');
}

export const editMessage = async(id: any, data: Message): Promise<Message | null> => {
    if(data !== undefined){
        const message = await MessagesModel.findByIdAndUpdate(id, data, { new: true });
        return message;
    }
    throw new AppError(404, `Error editing message #${id}`);
}

export const deleteMessage = async(id: any): Promise<string> => {
    const message = await MessagesModel.findByIdAndDelete(id);
    if(message){
        return "success";
    }
    throw new AppError(404, `Error deleting message #${id}`);
}