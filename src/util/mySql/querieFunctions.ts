import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { mySqlDisconnect } from "./connectionFunctions";

export const insertIntoTableFromArray = async(
    table: string,
    array: Array<string>,
    currentConnection: Connection
): Promise<void> => {
    console.log(`Inserting ${array.length} entries into ${table} table...`);

    let queryElementFromArray;
    for (let i = 0; i < array.length; i++) {
        queryElementFromArray = `INSERT INTO ${table}(
            name
        ) VALUES (
            '${array[i]}'
        )`;
        await currentConnection.query(queryElementFromArray);
    }

    console.log('Done!\n');
};

export const selectQuery = async(
    query: string, 
    currentConnection: Connection, 
    param?: string
): Promise<RowDataPacket[]> => {
    const prepareConnection = await currentConnection.prepare(query);
    let [ results ] = await prepareConnection.execute(param? [param] : null);

    prepareConnection.close();
    currentConnection.unprepare(query);

    await mySqlDisconnect(currentConnection);
    return results as RowDataPacket[];
};

export const runQuery = async(
    query: string, 
    currentConnection: Connection, 
    values: any[],
    close = true
): Promise<ResultSetHeader> => {
    const prepareConnection = await currentConnection.prepare(query);
    let [ results ] = await prepareConnection.execute(values);

    prepareConnection.close();
    currentConnection.unprepare(query);

    if(close){
        await mySqlDisconnect(currentConnection);
    }
    return results as ResultSetHeader;
};

export const runQueryAsPacket = async(
    query: string, 
    currentConnection: Connection, 
    values: any[],
    close = true
): Promise<RowDataPacket[]> => {
    const prepareConnection = await currentConnection.prepare(query);
    let [ results ] = await prepareConnection.execute(values);

    prepareConnection.close();
    currentConnection.unprepare(query);

    if(close){
        await mySqlDisconnect(currentConnection);
    }
    return results as RowDataPacket[];
};

export const insertIntoTable = async(
    values: Array<any>,
    query: string,
    currentConnection: Connection
): Promise<ResultSetHeader> => {

    const prepareConnection = await currentConnection.prepare(query);
    const [ results ] = await prepareConnection.execute(values);

    prepareConnection.close();
    currentConnection.unprepare(query);

    return results as ResultSetHeader;
};

export const formatDateToSql = (date: Date | number) => {
    return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
};