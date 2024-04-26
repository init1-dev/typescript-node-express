import { RowDataPacket } from 'mysql2';
import { AppError } from '../classes/AppError';
import { Message } from '../models/Messages';
import { mySqlConnection } from '../util/mySql/connectionFunctions';
import { selectQuery, runQuery } from '../util/mySql/querieFunctions';
import { AddMessageQuery, DeleteMessageQuery, EditMessageQuery, selectMessagesQuery, selectOneMessageQuery } from '../util/mySql/queries/messageQueries';

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
    const currentConnection = await mySqlConnection();
    const query = AddMessageQuery;
    const values = Object.values(data);
    const headers = await runQuery(query, currentConnection, values, false);
    const results = await runQuery(selectOneMessageQuery, currentConnection, [headers.insertId]);
    return results;
};

export const editItem = async(id: any, data: ModelInterface) => {
    const currentConnection = await mySqlConnection();
    const query = EditMessageQuery;
    const values = Object.values(data);
    await runQuery(query, currentConnection, [...values, id], false);
    const results = await runQuery(selectOneMessageQuery, currentConnection, [id]);
    return results;
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