import { RowDataPacket } from 'mysql2';
import { AppError } from '../classes/AppError';
import { Message } from '../models/Messages';
import { mySqlConnection } from '../util/mySql/connectionFunctions';
import { selectQuery, runQuery } from '../util/mySql/querieFunctions';
import { DeleteMessageQuery, selectMessagesQuery, selectOneMessageQuery } from '../util/mySql/queries/messageQueries';

type ModelInterface = Message;

export const getAll = async(): Promise<RowDataPacket[]> => {
    const currentConnection = await mySqlConnection();
    const query = selectMessagesQuery;
    const results = await selectQuery(query, currentConnection);
    return results;
};

export const getOne = async(id: any): Promise<RowDataPacket[]> => {
    const currentConnection = await mySqlConnection();
    const query = selectOneMessageQuery;
    const results = await selectQuery(query, currentConnection, id);
    
    if(results.length === 0){
        throw new AppError(404, 'Not found');
    }
    return results;
};

export const newItem = async(data: ModelInterface) => {
    console.log(data);
    // const item = await Model.create(data);
    // if(item === null){
    //     throw new AppError(404, `Error adding ${messageString}`);
    // }
    // return item;
    return {};
};

export const editItem = async(id: any, data: ModelInterface) => {
    console.log(id, data);
    // const item = await Model.findByIdAndUpdate(id, data, { new: true });
    // if(item === null){
    //     throw new AppError(404, `Error editing ${messageString}`);
    // }
    // return item;
    return {};
};

export const deleteItem = async(id: any) => {
    const currentConnection = await mySqlConnection();
    const query = DeleteMessageQuery;
    const results = await runQuery(query, currentConnection, [id]);
    
    if(results.affectedRows === 0){
        throw new AppError(404, 'Not found');
    }
    
    return results;
};