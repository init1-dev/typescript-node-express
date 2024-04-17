import mongoose from "mongoose";
import { CLUSTER_CONNECTION } from "../getKeys";

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