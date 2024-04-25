// @ts-nocheck
import { Room } from '../models/Rooms';
import { AppError } from '../classes/AppError';
import { mySqlConnection } from '../util/mySql/mySqlConnection';
import { runQuery, selectQuery } from '../util/mySql/querieFunctions';
import { AddRoomQuery, DeleteRoomQuery, addRoomAmenities, selectOneRoomQuery, selectRoomsQuery } from '../util/mySql/queries';
import { RowDataPacket } from 'mysql2';

type ModelInterface = Room;

export const getAll = async(filter = false): Promise<RowDataPacket[]> => {
    const currentConnection = await mySqlConnection();
    const query = selectRoomsQuery;
    const results = await selectQuery(query, currentConnection);
    return results;
};

export const getOne = async(id: any): Promise<RowDataPacket[]> => {
    const currentConnection = await mySqlConnection();
    const query = selectOneRoomQuery;
    const results = await selectQuery(query, currentConnection, id);
    
    if(results.length === 0){
        throw new AppError(404, 'Not found');
    }
    return results;
};

export const newItem = async(data: ModelInterface) => {
    const currentConnection = await mySqlConnection();
    const {amenities, ...formData} = data;
    const roomQuery = AddRoomQuery;
    const values = Object.values(formData);
    const headers = await runQuery(roomQuery, currentConnection, values, false);
    await runQuery(addRoomAmenities(headers.insertId, amenities), currentConnection, values, false);
    const results = await runQuery(selectOneRoomQuery, currentConnection, [headers.insertId]);
    return results;
};

export const editItem = async(id: any, data: ModelInterface) => {
    // const item = await Model.findByIdAndUpdate(id, data, { new: true });
    // if(item === null){
    //     throw new AppError(404, `Error editing ${messageString}`);
    // }
    // return item;
    return {};
};

export const deleteItem = async(id: any) => {
    const currentConnection = await mySqlConnection();
    const query = DeleteRoomQuery;
    const results = await runQuery(query, currentConnection, [id]);
    
    if(results.affectedRows === 0){
        throw new AppError(404, 'Not found');
    }
    
    return results;
};

export const isRoomExist = async(number: string) => {
    // const item = await Model.findOne({room_number: number});
    // return item;
    return {};
};