import { RowDataPacket } from 'mysql2';
import { AppError } from '../classes/AppError';
import { Booking } from '../models/Bookings';
import { mySqlConnection } from '../util/mySql/connectionFunctions';
import { runQuery, selectQuery } from '../util/mySql/querieFunctions';
import { AddBookingQuery, DeleteBookingQuery, EditBookingQuery, selectBookingsQuery, selectOneBookingQuery } from '../util/mySql/queries/bookingQueries';

type ModelInterface = Booking;

export const getAll = async(): Promise<RowDataPacket[]> => {
    const currentConnection = await mySqlConnection();
    const query = selectBookingsQuery;
    const results = await selectQuery(query, currentConnection);
    return results;
};

export const getOne = async(id: any): Promise<RowDataPacket[]> => {
    const currentConnection = await mySqlConnection();
    const query = selectOneBookingQuery;
    const results = await selectQuery(query, currentConnection, id);
    
    if(results.length === 0){
        throw new AppError(404, 'Not found');
    }
    return results;
};

export const newItem = async(data: ModelInterface) => {
    const currentConnection = await mySqlConnection();
    const query = AddBookingQuery;
    const values = Object.values(data);
    const headers = await runQuery(query, currentConnection, values, false);
    const results = await runQuery(selectOneBookingQuery, currentConnection, [headers.insertId]);
    return results;
};

export const editItem = async(id: any, data: ModelInterface) => {
    const currentConnection = await mySqlConnection();
    const query = EditBookingQuery;
    const values = Object.values(data);
    await runQuery(query, currentConnection, [...values, id], false);
    const results = await runQuery(selectOneBookingQuery, currentConnection, [id]);
    return results;
};

export const deleteItem = async(id: any) => {
    const currentConnection = await mySqlConnection();
    const query = DeleteBookingQuery;
    const results = await runQuery(query, currentConnection, [id]);
    
    if(results.affectedRows === 0){
        throw new AppError(404, 'Not found');
    }
    
    return results;
};