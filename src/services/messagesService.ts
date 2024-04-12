import { AppError } from '../classes/AppError';
import { Message, MessagesModel } from '../models/Messages';

const Model = MessagesModel;
const messageString = "message";
type ModelInterface = Message;

export const getAll = async(): Promise<ModelInterface[]> => {
    const items = await Model.find();
    return items;
}

export const getOne = async(id: any): Promise<ModelInterface> => {
    const item = await Model.findById(id);
    if(item === null){
        throw new AppError(404, 'Not found');
    }
    return item;
}

export const newItem = async(data: ModelInterface): Promise<ModelInterface> => {
    const item = await Model.create(data);
    if(item === null){
        throw new AppError(404, `Error adding ${messageString}`);
    }
    return item;
}

export const editItem = async(id: any, data: ModelInterface): Promise<ModelInterface> => {
    const item = await Model.findByIdAndUpdate(id, data, { new: true });
    if(item === null){
        throw new AppError(404, `Error editing ${messageString}`);
    }
    return item;
}

export const deleteItem = async(id: any): Promise<ModelInterface> => {
    const item = await Model.findByIdAndDelete(id);
    if(item === null){
        throw new AppError(404, `Error deleting ${messageString}`);
    }
    return item;
}