import { Room } from '../models/Rooms';
import { AppError } from '../classes/AppError';
import { mySqlConnection } from '../util/mySql/connectionFunctions';
import { runQuery, selectQuery } from '../util/mySql/querieFunctions';
import { RowDataPacket } from 'mysql2';
import { AddRoomQuery, DeleteRoomQuery, EditRoomQuery, addRoomAmenities, selectOneRoomByNumberQuery, selectOneRoomQuery, selectRoomsQuery } from '../util/mySql/queries/roomQueries';

type ModelInterface = Room;

export const getAll = async(filter = false): Promise<RowDataPacket[]> => {
    console.log(filter);
    
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
    const currentConnection = await mySqlConnection();
    const {amenities, ...formData} = data;
    const roomQuery = EditRoomQuery;
    const values = Object.values(formData);
    await runQuery(roomQuery, currentConnection, [...values, id], false);
    await runQuery('DELETE FROM room_amenities WHERE room_id = ?', currentConnection, [id], false);
    await runQuery(addRoomAmenities(id, amenities), currentConnection, values, false);
    const results = await runQuery(selectOneRoomQuery, currentConnection, [id]);
    return results;
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
    const currentConnection = await mySqlConnection();
    const query = selectOneRoomByNumberQuery;
    const results = await selectQuery(query, currentConnection, number);
    
    if(results.length === 0){
        throw new AppError(404, 'Not found');
    }
    return results[0].name;
};