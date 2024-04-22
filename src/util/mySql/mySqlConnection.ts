import mysql from "mysql2/promise";
import { CLUSTER_CONNECTION } from "../getKeys";
import mongoose from "mongoose";

const useConnection = (url = "cluster") => {
    if(url !== 'cluster'){
        const SERVER_URL = 'localhost:27017';
        const DB_NAME = 'mongo-miranda-db';
        const AUTH_SOURCE = 'authSource=admin';
        
        return `mongodb://${SERVER_URL}/${DB_NAME}?${AUTH_SOURCE}`;
    }
    return CLUSTER_CONNECTION;
}

export const mongooseConnect = async() => {
    const CONNECTION_URL = useConnection();
    if(mongoose.connection.readyState === 0){
        console.log(`Connecting to database..`);
        await mongoose.connect(`${CONNECTION_URL}`).then((x) => {
            console.log(`Connected to: "${x.connections[0].name}"\n`);
            })
            .catch((err) => {
            console.error("Error connecting to mongo: ", err);
        });
        return mongoose.connection;
    }
}

export const mySqlConnection = async(): Promise<mysql.Connection> => {
    const mirandaSQLDb = 'hotel_miranda_SQL';
    console.log(`Connecting to database..`);
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'As7£68?=xU&JwCq5~c5V3]zJ',
            database: mirandaSQLDb
        });
        // console.log(connection);
        
        console.log(`Connected to: "${connection.config.database}"\n`);
        return connection;
    } catch (error) {
        console.error("Error connecting to db: ", error);
        throw error;
    }
}