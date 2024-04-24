import mysql, { Connection } from "mysql2/promise";

import { connectionBase, mySqlConfig } from "./mySqlConfig";

interface mySqlConnectionInterface {
    database: boolean;
}

export const mySqlConnection = async(
    { database = true } = {} as mySqlConnectionInterface
): Promise<mysql.Connection> => {

    console.log(`Connecting to database..`);
    
    try {
        let connectionConfig;

        if(database){
            connectionConfig = {
                ...connectionBase,
                database: mySqlConfig.database
            };
        } else {
            connectionConfig = connectionBase;
        }

        const connection = await mysql.createConnection(connectionConfig);

        console.log(`Connected to: "${connection.config.database}"\n`);
        return connection;
    } catch (error) {
        console.error("Error connecting to db: ", error);
        throw error;
    }
}

export const mySqlDisconnect = async(currentConnection: Connection): Promise<void> => {
    try {
        await currentConnection.end();
        console.log('Disconnected from MySQL');
    } catch (error) {
        console.error("Error disconnecting from MySQL: ", error);
        throw error;
    }
}