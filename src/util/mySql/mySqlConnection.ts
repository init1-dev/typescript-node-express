import mysql, { Connection } from "mysql2/promise";
// import { CLUSTER_CONNECTION } from "../getKeys";
// import mongoose from "mongoose";

import { connectionBase, mySqlConfig } from "./mySqlConfig";

// const useConnection = (url = "cluster") => {
//     if(url !== 'cluster'){
//         const SERVER_URL = 'localhost:27017';
//         const DB_NAME = 'mongo-miranda-db';
//         const AUTH_SOURCE = 'authSource=admin';
        
//         return `mongodb://${SERVER_URL}/${DB_NAME}?${AUTH_SOURCE}`;
//     }
//     return CLUSTER_CONNECTION;
// }

// export const mongooseConnect = async() => {
//     const CONNECTION_URL = useConnection();
//     if(mongoose.connection.readyState === 0){
//         console.log(`Connecting to database..`);
//         await mongoose.connect(`${CONNECTION_URL}`).then((x) => {
//             console.log(`Connected to: "${x.connections[0].name}"\n`);
//             })
//             .catch((err) => {
//             console.error("Error connecting to mongo: ", err);
//         });
//         return mongoose.connection;
//     }
// }

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